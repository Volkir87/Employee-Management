/*
DBHandler.js
Author: Kirill Volodkin
Created date: 2019-12-10

The script creates and supports DBHandler class which is responsible for connection to the database and closing the connection.
*/


const mysql = require("mysql");
const config = require("./config/DBConfig");

class DBHandler {
    constructor() {
        this.host = config.host;
        this.database = config.database;
        this.user = config.user;
        this.password = config.password
    }

    connect() {
        this.connection = mysql.createConnection({
            host: this.host,
            database: this.database,
            user: this.user,
            password: this.password
        });
        return this.connection;
    }

    close() {
        this.connection.end();
    }
}

module.exports = DBHandler;