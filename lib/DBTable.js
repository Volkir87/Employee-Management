class DBTable {
    constructor(connection, table){
        this.connection = connection;
        this.table = table;
    }

    select(){
        let result = connection.query(
            `select * from ${this.table}`
        )
    }

}
