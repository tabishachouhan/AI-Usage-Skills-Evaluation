
CREATE TABLE activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  minutes INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activities_user_date ON activities(user_id, date);
CREATE INDEX idx_activities_user_id ON activities(user_id);
