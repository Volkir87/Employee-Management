const Menu = require("./lib/Menu");
const DBHandler = require("./lib/DBHandler");
const DBEmployee = require("./lib/DBEmployee");
const DBRole = require("./lib/DBRole");
const DBDepartment = require("./lib/DBDepartment");

const app = new Menu(); 
const db = new DBHandler();

function runApp(){
    const connection = db.connect();
    mainMenuController(connection);
    //db.close();
}

async function mainMenuController(connection){
    let menuChoice = await app.mainMenu();
    if (menuChoice === 'Exit') {
        db.close();
        return;
    }
    else if (menuChoice === 'Employees') {
        employeeMenuController(connection);
    }
    else if (menuChoice === 'Departments') {
        departmentMenuController(connection);
    }
    else if (menuChoice === 'Roles') {
        roleMenuController(connection);
    }
}

async function employeeMenuController(connection){
    let empDB = new DBEmployee(connection);
    let roleDB = new DBRole(connection);
    let empAction = await app.employeeMenu();
    if (empAction === 'Back to main menu') {
        mainMenuController(connection);
    }
    else if (empAction === 'View all employees') {
        empDB.viewEmployees();
        employeeMenuController(connection);
    }
    else if (empAction === 'View employees by manager') {
        let managers = await empDB.getManagersList();
        let managersList = getNameList(managers);
        let selectedMan = await app.managerSelector(managersList);
        let manId = getID(managers, selectedMan);
        empDB.viewEmployeesByManager(manId);
        employeeMenuController(connection);
    }
    else if (empAction === 'Add employee') {
        let employees = await empDB.getEmployeeList();
        let roles = await roleDB.getRoleList();
        let empInfo = await app.newEmployee(roles, employees);
        let selectedRole = empInfo.role;
        let roleId = getID(roles, selectedRole);
        let selectedMan = empInfo.manager;
        let manId = getID(employees, selectedMan);
        empDB.addEmployee(empInfo.firstName, empInfo.lastName, roleId, manId);
        employeeMenuController(connection);
    }
    else if (empAction === 'Update employee role') {
        let employees = await empDB.getEmployeeList();
        let employeesList = getNameList(employees);
        let selectedEmp = await app.employeeSelector(employeesList);
        let empId = getID(employees, selectedEmp);
        let roles = await roleDB.getRoleList();
        let roleList = getNameList(roles);
        let selectedRole = await app.roleSelector(roleList);
        let roleId = getID(roles, selectedRole);
        empDB.updateEmployeeRole(empId, roleId);
        employeeMenuController(connection);
    }
    else if (empAction === 'Update employee manager') {
        let employees = await empDB.getEmployeeList();
        let employeesList = getNameList(employees);
        let selectedEmp = await app.employeeSelector(employeesList);
        let empId = getID(employees, selectedEmp);
        let managers = await empDB.getEmployeeList();
        let managerList = getNameList(managers);
        let selectedMan = await app.employeeSelector(managerList);
        let manId = getID(managers, selectedMan);
        empDB.updateEmployeeManager(empId, manId);
        employeeMenuController(connection);
    }
    else if (empAction === 'Remove employee') {
        let employees = await empDB.getEmployeeList();
        let employeesList = getNameList(employees);
        let selectedEmp = await app.employeeSelector(employeesList);
        let empId = getID(employees, selectedEmp);
        empDB.deleteEmployee(empId);
        employeeMenuController(connection);
    }
}

async function roleMenuController(connection){
    let roleDB = new DBRole(connection);
    let departmentDB = new DBDepartment(connection);
    let roleAction = await app.roleMenu();
    if (roleAction === 'Back to main menu') {
        mainMenuController(connection);
    }
    else if (roleAction === 'View all roles') {
        roleDB.viewAllRoles();
        roleMenuController(connection);
    }
    else if (roleAction === 'Add role') {
        let departments = await departmentDB.getDeparmentList();
        let role = await app.newRole(departments);
        let depId = getID(departments, role.department);
        roleDB.addRole(role.title, role.salary, depId);
        roleMenuController(connection);
    }
    else if (roleAction === 'Remove role') {
        let roles = await roleDB.getRoleList();
        let roleList = getNameList(roles);
        let selectedRole = await app.roleSelector(roleList);
        let roleId = getID(roles, selectedRole);
        roleDB.deleteRole(roleId);
        roleMenuController(connection);
    }
}

async function departmentMenuController(connection){
    let departmentDB = new DBDepartment(connection);
    let depAction = await app.departmentMenu();
    if (depAction === 'Back to main menu') {
        mainMenuController(connection);
    }
    else if (depAction === 'View all departments') {
        departmentDB.viewAllDepartments();
        departmentMenuController(connection);
    }
    else if (depAction === 'Departments and budgets') {
        departmentDB.viewDepartmentsBudget();
        departmentMenuController(connection);
    }
    else if (depAction === 'Add department') {
        let newDept = await app.newDepartment();
        departmentDB.addDeparment(newDept);
        departmentMenuController(connection);
    }
    else if (depAction === 'Remove department') {
        let departments = await departmentDB.getDeparmentList();
        let selectedDept = await app.departmentSelector(departments);
        let deptId = getID(departments,selectedDept);
        departmentDB.deleteDepartment(deptId);
        departmentMenuController(connection);
    }
}

function getID(objArray, value) {
    let id;
    for (let obj of objArray){
        if (obj.name === value){
            id = obj.id;
        }
    }
    return id;
}

function getNameList(objArray) {
    let result = [];
    for (obj of objArray){
        result.push(obj.name);
    }
    return result;
}

runApp();