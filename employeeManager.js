// List the dependencies here.
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');

// Create the connection to MySQL Workbench.
let connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user: 'root',
    password: '',
    database: 'employee_DB'
});

connection.query = util.promisify(connection.query);

// Begin the application fter establishing the connection.
connection.connect(function (err) {
    if (err) throw err;
    initialAction();
})

// Give the user a nice welcome message.
console.table(
    "\n------------ EMPLOYEE TRACKER ------------\n"
)

//  Ask the user initial action question to figure out what they would like to do.
const initialAction = async () => {
    try {
        let answer = await inquirer.prompt({
            name:'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'View Employees':
                employeeView();
                break;

                case 'View Departments':
                departmentView();
                break;

                case 'View Roles':
                    roleView();
                    break;
                
                case 'Add Employees':
                    employeeAdd();
                    break;

                case 'Add Departments':
                    departmentAdd();
                    break;
                
                case 'Add Roles':
                    roleAdd();
                    break;
                    
                case 'Update Employee Role':
                    employeeUpdate();
                    break;
                    
                case 'Exit':
                    connection.end();
                    break;
        };
    } catch (err) {
        console.log(err);
        initialAction();
    };
}

// Selection to view all of the employees.
const employeeView = async () => {
    console.log('Employee View');
    try {
        let query = 'SELECT * FROM employee';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let employeeArray = [];
            res.forEach(employee => employeeArray.push(employee));
            console.table(employeeArray);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    };
}  

// Selection to view all of the departments.
const departmentView = async () => {
    console.log('Department View');
    try {
        let query = 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            if(err) throw err;
            let departmentArray = [];
            res.forEach(department => departmentArray.push(department));
            console.table(departmentArray);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    };
}

// Selection to view all of the roles
