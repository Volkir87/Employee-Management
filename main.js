const Menu = require("./lib/Menu");

let app = new Menu(); 


async function runApp(){
    //let answer = await app.mainMenu();
    let answer = await app.newRole(['A', 'B', 'C']);
    console.log(answer)
}

runApp();