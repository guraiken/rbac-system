CREATE TABLE users IF NOT EXISTS (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(150) NOT NULL,
  email varchar(150) NOT NULL,
  password_hash varchar(255) NOT NULL,
  role enum('admin','user') NOT NULL DEFAULT 'user',
  PRIMARY KEY (id)
)