IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'residencial_db')
BEGIN
  CREATE DATABASE residencial_db;
END
GO
