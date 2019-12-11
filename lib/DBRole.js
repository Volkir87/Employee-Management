/*
DBRole.js
Author: Kirill Volodkin
Created date: 2019-12-10

The script creates and supports DBRole class which is responsible for running role-related queries.
*/

class DBRole {
    constructor(connection){
        this.connection = connection;
    }

    viewAllRoles(){
        this.connection.query(
            `select r.title as 'Title', r.salary as 'Salary', d.name as 'Department'
            from role r 
            left outer join department d on r.department_id = d.id;`, 
            function(err,data){
                if (err) throw err;
                console.table(data);
            }
        )
    }

    addRole(title, salary, departmentId) {
        this.connection.query(
            `insert into role (title, salary, department_id) values 
            ('${title}', ${salary}, ${departmentId})`,
            function(err,data){
                if (err) throw err;
                console.log("New role added successfully");
            }
        )
    }

    deleteRole(id){
        this.connection.query(
            `delete from role where id = ${id}`,
            function(err,data){
                if (err) throw err;
                console.log("Role deleted successfully");
            }
        )
    }
}

module.exports = DBRole;