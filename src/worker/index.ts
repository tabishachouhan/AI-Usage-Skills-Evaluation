import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import { ActivitySchema, CreateActivitySchema, UpdateActivitySchema } from "@/shared/types";

const app = new Hono<{ Bindings: Env }>();

/**
 * Authentication Routes
 */

// Get OAuth redirect URL for Google login
app.get("/api/oauth/google/redirect_url", async (c) => {
  const redirectUrl = await getOAuthRedirectUrl("google", {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

// Exchange authorization code for session token
app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

// Get current authenticated user
app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

// Logout user
app.get("/api/logout", async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === "string") {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

/**
 * Activity Routes
 * All routes are protected and require authentication
 */

// Get activities for a specific date
app.get("/api/activities/:date", authMiddleware, async (c) => {
  const user = c.get("user");
  const date = c.req.param("date");

  // Validate date format (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return c.json({ error: "Invalid date format. Use YYYY-MM-DD" }, 400);
  }

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM activities WHERE user_id = ? AND date = ? ORDER BY created_at ASC"
  )
    .bind(user.id, date)
    .all();

  return c.json(results);
});

// Create a new activity
app.post("/api/activities", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json();

  // Validate input
  const validation = CreateActivitySchema.safeParse(body);
  if (!validation.success) {
    return c.json({ error: validation.error.errors }, 400);
  }

  const { date, name, category, minutes } = validation.data;

  // Check if total minutes for the day would exceed 1440
  const { total_minutes } = await c.env.DB.prepare(
    "SELECT COALESCE(SUM(minutes), 0) as total_minutes FROM activities WHERE user_id = ? AND date = ?"
  )
    .bind(user.id, date)
    .first() as { total_minutes: number };

  if (total_minutes + minutes > 1440) {
    return c.json({ 
      error: `Adding this activity would exceed 24 hours (1440 minutes) for this day. Current total: ${total_minutes} minutes.` 
    }, 400);
  }

  // Insert activity
  const result = await c.env.DB.prepare(
    "INSERT INTO activities (user_id, date, name, category, minutes) VALUES (?, ?, ?, ?, ?) RETURNING *"
  )
    .bind(user.id, date, name, category, minutes)
    .first();

  return c.json(result, 201);
});

// Update an existing activity
app.put("/api/activities/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const activityId = parseInt(c.req.param("id"));
  const body = await c.req.json();

  // Validate input
  const validation = UpdateActivitySchema.safeParse(body);
  if (!validation.success) {
    return c.json({ error: validation.error.errors }, 400);
  }

  // Check if activity exists and belongs to user
  const existing = await c.env.DB.prepare(
    "SELECT * FROM activities WHERE id = ? AND user_id = ?"
  )
    .bind(activityId, user.id)
    .first();

  if (!existing) {
    return c.json({ error: "Activity not found" }, 404);
  }

  const updates = validation.data;

  // If minutes are being updated, check daily limit
  if (updates.minutes !== undefined) {
    const { total_minutes } = await c.env.DB.prepare(
      "SELECT COALESCE(SUM(minutes), 0) as total_minutes FROM activities WHERE user_id = ? AND date = ? AND id != ?"
    )
      .bind(user.id, (existing as any).date, activityId)
      .first() as { total_minutes: number };

    if (total_minutes + updates.minutes > 1440) {
      return c.json({ 
        error: `Updating this activity would exceed 24 hours (1440 minutes) for this day. Current total (excluding this activity): ${total_minutes} minutes.` 
      }, 400);
    }
  }

  // Build update query dynamically
  const fields = [];
  const values = [];
  
  if (updates.name !== undefined) {
    fields.push("name = ?");
    values.push(updates.name);
  }
  if (updates.category !== undefined) {
    fields.push("category = ?");
    values.push(updates.category);
  }
  if (updates.minutes !== undefined) {
    fields.push("minutes = ?");
    values.push(updates.minutes);
  }

  fields.push("updated_at = CURRENT_TIMESTAMP");
  values.push(activityId, user.id);

  const result = await c.env.DB.prepare(
    `UPDATE activities SET ${fields.join(", ")} WHERE id = ? AND user_id = ? RETURNING *`
  )
    .bind(...values)
    .first();

  return c.json(result);
});

// Delete an activity
app.delete("/api/activities/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const activityId = parseInt(c.req.param("id"));

  const result = await c.env.DB.prepare(
    "DELETE FROM activities WHERE id = ? AND user_id = ? RETURNING *"
  )
    .bind(activityId, user.id)
    .first();

  if (!result) {
    return c.json({ error: "Activity not found" }, 404);
  }

  return c.json({ success: true });
});

export default app;
