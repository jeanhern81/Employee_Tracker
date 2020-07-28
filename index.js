var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//create the connection information for the sql databse
var connection = mysql.createConnection({
host: "localhost",
//your port; if not 3306
port: 3306,
//your root password
password: "Mercury35!",
database: "employee_DB"
});

//connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
//run the start function after the connection is made to prompt the server
firstPromt();
});

//function which prompts the user for what action they should take
function firstPromt () {
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
        })

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

function addEmployee() {
//role table
    connection.query("Select * FROM role", function(err, res){
        inquirer
            .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "What is the employee's first name?"                    
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is your employee's last name?"
                },
                {
                    name: "employeeRole",
                    type: "list",
                    message: "What is the employee's role?",
                //an array that returns employee job tiles. 
                    choices: result.map(role => role.title)
                },
            ])
            .then(({ firstName, lastName, employeeRole }) => {
                // Create a variable to use as the role_id
                let roleID;
                // Loop over the results, if the role title that is selected is equal to an existing role ID (using the employeeRole answer) then assign the variable roleID to the actual role id and run the SQL query
                result.map(finds => {
                    if(finds.title === employeeRole) {
                    roleID = finds.id;
                    // Inserts what the user entered - into the employee table as a new employee
                    connection.query("INSERT INTO employee SET ?", 
                    {
                        first_name: firstName,
                        last_name: lastName,
                        role_id: roleID
                    },
                    // Logs a success message to the user in the console 
                    console.log("Your employee was created successfully!")
                    );
                    // Selects all of the columns for the department table
                    connection.query('SELECT * FROM employee', function(err, result) {
                      // if there is an error, throw the error 
                        if(err) throw err;
                      // Prints out the sql table in the console
                        console.table(result);
                      // Starts the user prompts
                        startPrompts();
                    });
                };
            });
        });
    });
}

        function addDepartment() {
        inquirer
            .prompt({
            name: "addDepartment",
            type: "input",
            message: "What department would you like to add?"
        })
            .then(({ addDepartment })=> {
            // Inserts what the user entered - into the department table as a new department 
            connection.query("INSERT INTO department SET ?", 
            {
                department_name: addDepartment
            },
            // Logs a success message to the user in the console 
            console.log(`\n Success! You added a new department: ${addDepartment}`)
            );
            // Selects all of the columns for the department table
            connection.query('SELECT * FROM department', function(err, result) {
              // if there is an error, throw the error 
                if(err) throw err;
              // Prints out the sql table in the console
            console.table(result);
              // Starts the user prompts
                startPrompts();
            });
        });
    };
        function addRole() {
        connection.query('SELECT * FROM department', function(err, result){
            if(err) throw err;
            inquirer
                .prompt([
                {
                    name: "roleTitle",
                    type: "input",
                    message: "What is the job title you would like to add?"
                },
                {
                name: "roleSalary",
                type: "input",
                message: "What is the salary of the job you are adding? (must be number)",
                // Validates that the user enters a number and returns and error if the input is not valid
                validate: function(salary) {
                    if (isNaN(salary) === false){
                    return true;
                    }
                    return "Please enter a valid number";
                }
                },
                {
                name: "roleID",
                type: "rawlist",
                // Loops over the results, runs a function on every department name in the SQL column
                choices: result.map(department => department.department_name)
                }
            ])


        .then(({ roleTitle, roleSalary, roleID }) => {
        // Create a variable to use as the department_id number 
            let deptID;
        // Loop over the results, if the deptartment_name that is selected is equal to an existing department ID (using roleID answer) then assign the variable deptID to the actual department id and run the SQL query
            result.map(finds => {
                if(finds.department_name === roleID) {
                    deptID = finds.id;
                  // Inserts what the user entered - into the role table as a new role
                    connection.query('INSERT INTO role SET ?', 
                    { 
                        title: roleTitle, 
                        salary: roleSalary,
                        department_id: deptID
                    },
                    // Logs a success message to the user in the console 
                    console.log(`\n Success! You added a new job title: ${roleTitle}, \n With a salary of ${roleSalary}`)
                );
                }
            })
            // Selects all of the columns in the SQL role table 
            connection.query('SELECT * FROM role', function(err, result){
                // If there is an error, throw the err
                if(err) throw err;
                // Prints out the SQL role table in the console
                console.table(result);
                // Starts the user prompts
                startPrompts();
                });
            })

        })
    }
    
    function viewEmployees() {
        // Selects all of the columns from the employee table
        connection.query('SELECT * FROM employee', function(err, result){
          // if there is an error, throw the error
        if(err) throw err;
          // prints the current amount of employees
        console.log('There are: ' + result.length + ' total employees');
          // Prints out the SQL employee table in the console
        console.table(result);
          // Starts the user prompts
        startPrompts();
        });
    };

    function viewDepartments() {
        // Selects all of the columns from the department table 
        connection.query('SELECT * FROM department', function(err, result){
          // If there is an error, throw the error
        if(err) throw err;
          // Prints out the SQL department table in the console 
        console.table(result);
          // Starts the user prompts
        startPrompts();
        })
    }

    function viewRoles() {
        // Selects all of the columns from the roles table
        connection.query('SELECT * FROM role', function(err, result){
        // If there is an error, throw the error
        if(err) throw err;
        // Prints out the SQL role table in the console
        console.table(result);
        // Starts the user prompts
        startPrompts();
        })
    }

    function updateEmployeeRole() {
        connection.query('SELECT id, first_name, last_name FROM employee', function(err, result){
        if(err) throw err;
        inquirer
            .prompt([
                {
                    name: "employeeID",
                    type: "rawlist",
                    message: "Which employee role would you like to update?",
                // Loops over the results, runs a function on every department name in the SQL column
                    choices: result.map(name => `${name.first_name} ${name.last_name}`)
                },
                {
                name: "employeeRole",
                type: "list",
                message: "What is the employee's role?",
                // Creates a new array that returns the array of role title's
                choices: result.map(role => role.title)
                }
            
            ]).then(({ employeeID, lastName }) => {
                console.log(employeeID);
            })
        })
}

process.on("exit", async function(code) {
    await db.close();
    return console.log(`About to exit with code ${code}`);
});