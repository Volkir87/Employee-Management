/*
DBEmployee.js
Author: Kirill Volodkin
Created date: 2019-12-10

The script creates and supports DBEmployee class which is responsible for running employee-related queries.
*/

class DBEmployee {
    constructor(connection){
        this.connection = connection;
    }

    viewEmployees(){
        this.connection.query(
            `select e1.first_name as 'First Name', e1.last_name as 'Last Name', r.title as 'Title', d.name as 'Department', 
            case when e1.manager_id is not null then concat(e2.first_name, ' ', e2.last_name)
            else 'No manager' end as 'Manager'
            from employee e1
            left outer join employee e2 on e1.manager_id = e2.id
            left outer join role r on e1.role_id = r.id
            left outer join department d on r.department_id = d.id;`, 
            function(err,data){
                if (err) throw err;
                console.table(data);
            }
        )
    }

    viewEmployeesByManager(managerId){
        this.connection.query(
            `select e1.first_name as 'First Name', e1.last_name as 'Last Name', r.title as 'Title', d.name as 'Department', 
            case when e1.manager_id is not null then concat(e2.first_name, ' ', e2.last_name)
            else 'No manager' end  as 'Manager'
            from employee e1
            left outer join employee e2 on e1.manager_id = e2.id
            left outer join role r on e1.role_id = r.id
            left outer join department d on r.department_id = d.id
            where e1.manager_id = ${managerId};`, 
            function(err,data){
                if (err) throw err;
                console.table(data);
            }
        )
    }

    addEmployee(firstName, lastName, roleId, managerId) {
        this.connection.query(
            `insert into employee (first_name, last_name, role_id, manager_id) 
            values ('${firstName}', '${lastName}', ${roleId}, ${managerId})`,
            function(err,data){
                if (err) throw err;
                console.log("New Employee record inserted successfully");
            }
        )
    }

    deleteEmployee(id) {
        this.connection.query(
            `delete from employee where id = ${id}`,
            function(err,data){
                if (err) throw err;
                console.log("Employee deleted successfully");
            }
        )
    }

    updateEmployeeRole(id, roleId){
        this.connection.query(
            `update employee set role_id = ${roleId} where id = ${id}`,
            function(err,data){
                if (err) throw err;
                console.log("Employee role updated successfully");
            }
        )
    }

    updateEmployeeManager(id, managerId){
        this.connection.query(
            `update employee set manager_id = ${managerId} where id = ${id}`,
            function(err,data){
                if (err) throw err;
                console.log("Employee manager updated successfully");
            }
        )
    }
}

module.exports = DBEmployee;