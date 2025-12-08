import z from "zod";

/**
 * Activity categories available for time tracking
 */
export const ACTIVITY_CATEGORIES = [
  "Work",
  "Study",
  "Sleep",
  "Entertainment",
  "Exercise",
  "Personal Care",
  "Social",
  "Travel",
  "Other"
] as const;

export type ActivityCategory = typeof ACTIVITY_CATEGORIES[number];

/**
 * Zod schema for activity validation
 * Ensures activity data meets requirements before saving to database
 */
export const ActivitySchema = z.object({
  id: z.number().optional(),
  user_id: z.string(),
  date: z.string(), // YYYY-MM-DD format
  name: z.string().min(1, "Activity name is required").max(100),
  category: z.enum(ACTIVITY_CATEGORIES),
  minutes: z.number().int().min(1, "Duration must be at least 1 minute").max(1440, "Duration cannot exceed 24 hours"),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type Activity = z.infer<typeof ActivitySchema>;

/**
 * Schema for creating a new activity
 */
export const CreateActivitySchema = ActivitySchema.omit({
  id: true,
  user_id: true,
  created_at: true,
  updated_at: true,
});

export type CreateActivityInput = z.infer<typeof CreateActivitySchema>;

/**
 * Schema for updating an existing activity
 */
export const UpdateActivitySchema = CreateActivitySchema.partial();

export type UpdateActivityInput = z.infer<typeof UpdateActivitySchema>;
