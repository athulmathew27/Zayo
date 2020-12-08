var mysql=require("mysql");
//require('dotenv').config();

var mysqlconn= mysql.createConnection(
    {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        multipleStatements : true
    });
    mysqlconn.connect((err)=>{
        if(!err)
            console.log("Database connected");
        else
            console.log("connection failed"+err);        
    });

    module.exports = mysqlconn;