var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
//const Choice = require("inquirer/lib/objects/choice");

//create the connection information for the sql databse
var connection = mysql.createConnection({
host: "localhost",
//your port; if not 3306
port: 3306,
//user 
user: "root",
//your root password
password: "Mercury35!",
//name of database
database: "employee_DB"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    askQuestions();
});

//function which prompts the user for what action they should take
function askQuestions() {
    inquirer.prompt({
        message: "what would you like to do?",
        type: "list",
        choices: [
            "View All Employees",
            "View All Departments",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "QUIT"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
    //switch statement for the above choices
        switch (answers.choice) {
            case "view all employees":
                viewEmployees()
                break;

            case "view all departments":
                viewDepartments()
                break;

            case "Add Employee":
                addEmployee()
                break;

            case "Add Department":
                addDepartment()
                break;

            case "Add Role":
                addRole()
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break;

            default:
                connection.end()
                break;
        }
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        /*{
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"
        }*/
    ]).then(function(res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [res.firstName, res.lastName, res.roleId], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    }, ]).then(function(res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function addRole() {
    inquirer.prompt([{
            message: "enter title:",
            type: "input",
            name: "title"
        }, 
        {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, 
        {
            message: "enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (use first name only for now)",
            type: "input",
            name: "name"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}


