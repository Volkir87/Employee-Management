const mysql = require("mysql");

class DBHandler {
    constructor(host, database, user, password) {
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password
    }

    connect() {
        let connection = mysql.createConnection({
            host: this.host,
            database: this.database,
            user: this.user,
            password: this.password
        });
        return connection;
    }

    

}