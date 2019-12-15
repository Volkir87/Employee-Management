use ems_db;

select id, title from role;

select e1.first_name as 'First Name', e1.last_name as 'Last Name', r.title as 'Title', d.name as 'Department', 
case when e1.manager_id is not null then concat(e2.first_name, ' ', e2.last_name)
else 'No manager' end  as 'Manager'
from employee e1
left outer join employee e2 on e1.manager_id = e2.id
left outer join role r on e1.role_id = r.id
left outer join department d on r.department_id = d.id
where e1.manager_id = 2;

select id, concat(first_name, last_name) from employee

select r.title as 'Title', r.salary as 'Salary', d.name as 'Department'
from role r 
left outer join department d on r.department_id = d.id;


select name
from department;


select d.name as 'Department', sum(r.salary) as 'Salary budget'
from employee e
inner join role r on r.id = e.role_id
inner join department d on d.id = r.department_id
group by d.name;


update employee 
set manager_id = 
where id = 

update employee 
set role_id = 
where id = 
