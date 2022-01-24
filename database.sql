CREATE DATABASE IF NOT EXISTS capstone;

CREATE TABLE IF NOT EXISTS t_food(
    f_id SERIAL PRIMARY KEY,
    f_name VARCHAR(255),
    f_pic_url VARCHAR(2048),
    f_desc VARCHAR(255),
    f_price DECIMAL(3,2)
);

CREATE TABLE IF NOT EXISTS t_user(
    -- u_id SERIAL PRIMARY KEY,
    -- is good to use uuid, it can give a id more like id
    -- need extension for uuid in pg
    -- put this in pgSQL cmd: create extension if not exists "uuid-ossp";
    u_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    u_name VARCHAR(12), 
    -- u_password VARCHAR(max), --I don't know what it should be stored as
    u_password VARCHAR(255), 
    u_email VARCHAR(255),
    u_type VARCHAR(255)

);


INSERT INTO t_user(u_email, u_password,u_name) VALUES('yongqi@gmail.com','s123','yongqi');



CREATE TABLE IF NOT EXISTS t_transactions(
   tr_id SERIAL PRIMARY KEY,
    f_id SERIAL,
    u_id SERIAL,
    FOREIGN KEY (f_id) REFERENCES t_food (f_id),
    FOREIGN KEY (u_id) REFERENCES t_user (u_id),
    tr_total DECIMAL (4,2),
    tr_time TIMESTAMP

);