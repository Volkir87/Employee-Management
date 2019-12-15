/*
DBRole.js
Author: Kirill Volodkin
Created date: 2019-12-10

The script creates and supports DBRole class which is responsible for running role-related queries.
*/

const util = require("util");

class DBRole {
    constructor(connection){
        this.connection = connection;
    }

    async getRoleList(){
        this.connection.query = util.promisify (this.connection.query);
        let result = await this.connection.query(
            `select id, title as 'name' from role`);
        //console.log("result is: ", result);
        return result;
    }

    viewAllRoles(){
        this.connection.query(
            `select r.title as 'Title', r.salary as 'Salary', d.name as 'Department'
            from role r 
            left outer join department d on r.department_id = d.id;`, 
            function(err,data){
                if (err) throw err;
                console.log('\n');
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
                console.log("\n New role added successfully");
            }
        )
    }

    deleteRole(id){
        this.connection.query(
            `delete from role where id = ${id}`,
            function(err,data){
                if (err) throw err;
                console.log("\n Role deleted successfully");
            }
        )
    }
}

module.exports = DBRole;