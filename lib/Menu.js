/*
Menu.js
Author: Kirill Volodkin
Created date: 2019-12-09

The script creates and supports Menu class which is responsible for user interaction with the system.
*/

const inquirer = require("inquirer");

class Menu {
    constructor(){
    }

    async mainMenu(){ 
        let choice = await inquirer.prompt({
            type: "list",
            message: "What would you like to do:",
            name: "operation",
            choices: ["Employees", "Departments", "Roles", "Exit"]
        });
        return choice.operation;
    }

    async employeeMenu(){
        console.log("--- EMPLOYEES ---")
        let choice = await inquirer.prompt({
            type: "list",
            message: "Please choose an operation: ",
            name: "operation",
            choices: ["View all employees", "View employees by manager",
             "Add employee", "Update employee role", "Update employee manager", 
             "Remove employee", "Back to main menu"]
        });
        return choice.operation;
    }

    async departmentMenu(){
        console.log("--- DEPARTMENTS ---")
        let choice = await inquirer.prompt({
            type: "list",
            message: "Please choose an operation: ",
            name: "operation",
            choices: ["View all departments", "Departments and budgets", "Add department", 
             "Remove department", "Back to main menu"]
        });
        return choice.operation;        
    }

    async roleMenu(){
        console.log("--- ROLES ---")
        let choice = await inquirer.prompt({
            type: "list",
            message: "Please choose an operation: ",
            name: "operation",
            choices: ["View all roles", "Add role", "Remove role", "Back to main menu"]
        });
        return choice.operation;        
    }

    async managerSelector(managersList){
        let choice = await inquirer.prompt({
            type: "list",
            message: "Please select a manager: ",
            name: "manager",
            choices: managersList
        });
        return choice.manager;   
    }
    
    async employeeSelector(employeesList){
        let choice = await inquirer.prompt({
            type: "list",
            message: "Please select an employee: ",
            name: "employee",
            choices: employeesList
        });
        return choice.employee;   
    }

    async roleSelector(roleList){
        let choice = await inquirer.prompt({
            type: "list",
            message: "Please select a role: ",
            name: "role",
            choices: roleList
        });
        return choice.role;   
    }

    async departmentSelector(departmentList){
        let choice = await inquirer.prompt({
            type: "list",
            message: "Please select a department: ",
            name: "department",
            choices: departmentList
        });
        return choice.department;   
    }

    async newEmployee(roleList, employeesList){
        let answer = await inquirer.prompt([{
            type: "input",
            message: "Employee first name:",
            name: "firstName"
        },
        {
            type: "input",
            message: "Employee last name:",
            name: "lastName"
        },
        {
            type: "list",
            message: "Employee role:",
            name: "role",
            choices: roleList
        },
        {
            type: "list",
            message: "Employee manager:",
            name: "manager",
            choices: employeesList
        }
    ]);
        return answer;   
    }

    async newRole(departmentList){
        let answer = await inquirer.prompt([{
            type: "input",
            message: "Title name:",
            name: "title"
        },
        {
            type: "input",
            message: "Salary:",
            name: "salary",
            validate: this.validateInputNumber
        },
        {
            type: "list",
            message: "Department:",
            name: "department",
            choices: departmentList
        }
    ]);
        return answer; 
    }

    async newDepartment(){
        let answer = await inquirer.prompt(
            {
                type: "input",
                message: "Department name: ",
                name: "department"
            }
        )
        return answer.department;
    };

    validateInputNumber (input){
        if (!parseInt(input)) {
            return 'Please input number'
        }
        else {
            return true;
        }
    }

}

module.exports = Menu;