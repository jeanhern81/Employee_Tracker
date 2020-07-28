var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//create the connection information for the sql databse
var connection = mysql.createConnection({
    host: "localhost",
//your port; if not 3306
    port: 3306,
//your root password
password: "",
database: "employee_DB"
});

//connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
//run the start function after the connection is made to prompt the server
StaticRange();
});

//function which prompts the user for what action they should take
function start () {
    inquirer
        .prompt
}



