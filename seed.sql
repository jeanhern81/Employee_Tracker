USE employee_DB;

INSERT INTO department (department_name)
VALUES  ("Engineer");
INSERT INTO departent (department_name)
VALUES ("Human Resources");
INSERT INTO department (department_name)
VALUES ("Marketing");
INSERT INTO department (department_name)
VALUES ("Finance");
INSERT INTO department (department_name)
VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Engineer", 160000, 1);
INSERT INTO role(title, salary, department_id)
VALUES ("Software Engineer", 90000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Human Resource Generalist", 75000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Coordinator", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Accoutant", 90000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 100000, 5);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dennis", "Reynolds", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Deandra", "Reynolds", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charlie", "Kelly", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ronald", "McDonald", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Frank", "Reynolds", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Ponderosa", 6, null);