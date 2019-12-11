const Menu = require("./lib/Menu");
const DBHandler = require("./lib/DBHandler");
const DBEmployee = require("./lib/DBEmployee");

let app = new Menu(); 


async function runApp(){
    //let answer = await app.mainMenu();
    //let answer = await app.newRole(['A', 'B', 'C']);
    //console.log(answer)
    let db = new DBHandler();
    let connection = db.connect();
    let emp = new DBEmployee(connection);
    emp.viewEmployees();
    db.close();
}

runApp();