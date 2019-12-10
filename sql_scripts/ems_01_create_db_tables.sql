drop database if exists ems_db;

create database ems_db;

use ems_db;

create table employee (
	id int not null auto_increment,
    first_name varchar(30) not null, 
    last_name varchar(30) not null,
    role_id int,
    manager_id int,
    primary key (id)
);

create table role (
	id int not null auto_increment,
    title varchar(30) not null,
    salary decimal,
    department_id int,
    primary key (id)
);

create table department (
	id int not null auto_increment,
	name varchar(30),
    primary key (id)
);