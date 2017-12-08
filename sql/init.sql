SET ROLE 'dbuser';
DROP DATABASE IF EXISTS gallery;
CREATE DATABASE gallery;
\c gallery;
SET ROLE 'dbuser';

CREATE TABLE Artist(
	artist_id integer primary key, 
	avator varchar(500), 
	name varchar(100), 
	address varchar(100), 
	self_intro varchar(3000), 
	gender varchar(100)
);

CREATE TABLE Painting(
	painting_id integer primary key, 
	artist_id integer references Artist(artist_id), 
	price float8, 
	height float8, 
	width float8,
	img varchar(500), 
	title varchar(100), 
	type varchar(100),
	available boolean default true
);

CREATE TABLE Customer(
	customer_id serial primary key,
	name varchar(100),
	email varchar(100) unique,
	password text
);

CREATE TABLE Buy(
	customer_id serial references Customer(customer_id),
	painting_id integer references Painting(painting_id)
);

CREATE TABLE Orders(
	order_number serial primary key,
	customer_id serial references Customer(customer_id),
	order_time timestamp with time zone
);

CREATE TABLE OrderItem(
	order_number serial references Orders(order_number),
	painting_id integer references Painting(painting_id),
	price float8,
	primary key(order_number, painting_id)
);
