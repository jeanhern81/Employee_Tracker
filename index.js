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
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Employee",
                "Add Department",
                "Add Role",
                "View Employee",
                "View Departments",
                "View Roles",
                "Update Employee Role",
                "Exit"
            ],
        });

//switch statement for the above choices
.then(function(answer) {
    switch (answer.action) {
        case "Add Employee":
        addEmployee();
        break;

        case "Add Department":
        addDepartment();
        break;

        case "Add Role":
        addRole();
        break;

        case "Add Role":
        addRole();
        break;

        case "View Employee":
        addEmployee();
        break;

        case "View Department":
        addDepartment();
        break;

        case "View Roles":
        addRoles();
        break;

        case "Update Employee Role":
        addUpdateEmployeeRole();
        break;

        case "Exit":
        connection.exit();
        break;
    }
});

}





