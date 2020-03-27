-- command to run the script in terminal
-- 🔻 use this command whit your terminal is pointing at the root directory of your project
-- psql -U postgres -a -f remakeDatabase.sql

-- env: DATABASE_URL=postgres://tetris_player:password@localhost:5432/tetris_be

DROP DATABASE IF EXISTS tetris_be;
DROP ROLE IF EXISTS tetris_player;

CREATE ROLE tetris_player
WITH 
  LOGIN
  PASSWORD 'password'
  CREATEDB 
  SUPERUSER
  CREATEROLE
;

CREATE DATABASE tetris_be
  WITH 
  OWNER = tetris_player
  ENCODING = 'UTF8'
  CONNECTION LIMIT = -1
;

CREATE DATABASE tetris_test_be
  WITH 
  OWNER = tetris_player
  ENCODING = 'UTF8'
  CONNECTION LIMIT = -1
;