DROP TABLE IF EXISTS projects CASCADE;
CREATE TABLE projects (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  target_amount NUMERIC NOT NULL,
  target_date DATE NOT NULL,
  min_amount NUMERIC NOT NULL,
  link VARCHAR(255),
  round VARCHAR(50),
  contract TEXT,
  auth_id VARCHAR(255) REFERENCES users(auth_id) NOT NULL,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);