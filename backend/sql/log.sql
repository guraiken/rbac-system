
CREATE TABLE IF NOT EXISTS log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(100),
  user_id INT UNSIGNED,
  action VARCHAR(150),
  affected_table VARCHAR(150),
  affected_id INT,
  old_value TEXT,
  new_value TEXT,
  changed_fields TEXT,
  ip VARCHAR(45),
  http_method VARCHAR(10),
  action_status VARCHAR(20),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_log_user_id (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;