/*
DBDepartment.js
Author: Kirill Volodkin
Created date: 2019-12-11

The script creates and supports DBDepartment class which is responsible for running department-related queries.
*/

class DBDepartment {
    constructor(connection){
        this.connection = connection;
    }

    viewAllDepartments(){
        this.connection.query(
            `select name
            from department;`, 
            function(err,data){
                if (err) throw err;
                console.table(data);
            }
        )
    }

    viewDepartmentsBudget(){
        this.connection.query(
            `select d.name as 'Department', sum(r.salary) as 'Salary budget'
            from employee e
            inner join role r on r.id = e.role_id
            inner join department d on d.id = r.department_id
            group by d.name;`, 
            function(err,data){
                if (err) throw err;
                console.table(data);
            }
        )
    }

    addDeparment(name){
        this.connection.query(
            `insert into department (name) values 
            ('${name}')`, 
            function(err,data){
                if (err) throw err;
                console.log("New department added successfully");
            }
        )
    }

    deleteDepartment(id){
        this.connection.query(
            `delete from department where id = ${id}`, 
            function(err,data){
                if (err) throw err;
                console.log("Department deleted successfully");
            }
        )
    }
}

module.exports = DBDepartment;