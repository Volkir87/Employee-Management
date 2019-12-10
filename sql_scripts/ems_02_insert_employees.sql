use ems_db;

insert into department (name) values 
('Management'),
('Operations'),
('Sales'),
('Information Technologies');


insert into role (title, salary, department_id) values 
('Director', 200000.00, 1),
('Operations Manager', 100000.00, 2),
('Operator', 50000.00, 2),
('Sales Manager', 110000.00, 3),
('Salesperson', 75000.00, 3),
('Developer', 100000.00, 4),
('Business Analyst', 70000.00, 4);


insert into employee (first_name, last_name, role_id, manager_id) values 
('John', 'Johnson', 1, null),
('Fred', 'Fredson', 2, 1),
('Richard', 'Richardson', 4, 1),
('Dominico', 'Dolce', 3, 2),
('Stefano', 'Gabbana', 3, 2),
('Calvin', 'Klein', 5, 3);
