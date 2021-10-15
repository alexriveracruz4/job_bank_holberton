CREATE DATABASE IF NOT EXISTS jbh_dev_db;
CREATE USER IF NOT EXISTS 'jbh_dev'@'localhost' IDENTIFIED BY 'jbh_dev_pwd';
GRANT ALL PRIVILEGES ON `jbh_dev_db`.* TO 'jbh_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'jbh_dev'@'localhost';
FLUSH PRIVILEGES;
