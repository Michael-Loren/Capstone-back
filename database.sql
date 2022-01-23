CREATE DATABASE IF NOT EXISTS capstone;

CREATE TABLE IF NOT EXISTS t_food(
    f_id SERIAL PRIMARY KEY,
    f_name VARCHAR(255),
    f_pic_url VARCHAR(2048),
    f_desc NVARCHAR(MAX),
    f_price DECIMAL(3,2)
);

CREATE TABLE IF NOT EXISTS t_user(
    u_id SERIAL PRIMARY KEY,
    u_name VARCHAR(12), 
    u_password VARCHAR(max), --I don't know what it should be stored as
    u_email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS t_transactions(
    tr_id SERIAL PRIMARY KEY,
    tr_f_fk FOREIGN KEY REFERENCES t_food(f_id),
    tr_u_fk FOREIGN KEY REFERENCES t_user(u_id),
    tr_total DECIMAL(4,2),
    tr_time DATETIME(DEFAULT)
);