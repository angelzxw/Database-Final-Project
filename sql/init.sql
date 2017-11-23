SET ROLE 'hw';
DROP DATABASE IF EXISTS gallery;
CREATE DATABASE gallery;
\c gallery;
SET ROLE 'hw';

CREATE TABLE Artist(
	artist_id serial primary key, 
	name varchar(100), 
	url varchar(100), 
	address varchar(100)
);

CREATE TABLE Painting(
	painting_id serial primary key,
	name varchar(100),
	year integer,
	price float8
);

CREATE TABLE Customer(
	customer_id serial primary key,
	name varchar(100),
	email varchar(100) unique,
	password text
);

CREATE TABLE Have(
	artist_id serial references Artist(artist_id),
	painting_id serial references Painting(painting_id),
	primary key(artist_id, painting_id)
);

CREATE TABLE Buy(
	customer_id serial references Customer(customer_id),
	painting_id serial references Painting(painting_id)
);

CREATE TABLE Orders(
	order_number serial primary key,
	customer_id serial references Customer(customer_id),
	order_time timestamp with time zone
);

CREATE TABLE OrderItem(
	order_number serial references Orders(order_number),
	painting_id serial references Painting(painting_id),
	price float8,
	primary key(order_number, painting_id)
);
