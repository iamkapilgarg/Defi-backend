DROP TABLE IF EXISTS fundings CASCADE;
CREATE TABLE fundings (
  id SERIAL PRIMARY KEY NOT NULL,
  auth_id VARCHAR(255) REFERENCES users(auth_id) NOT NULL,
  project_id INTEGER REFERENCES projects(id) NOT NULL,
  amount NUMERIC NOT NULL,
  transaction_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);