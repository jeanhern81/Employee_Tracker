SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


INSERT INTO department (department_name)
VALUES
        ("Engineer"),
        ("Human Resources"),
        ("Marketing"),
        ("Finance"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES
        ("Senior Engineer", 160000, 1),
        ("Software Engineer", 90000, 1),
        ("Human Resource Generalist", 75000, 2),
        ("Marketing Coordinator", 60000, 3),
        ("Accoutant", 90000, 4),
        ("Salesperson", 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES      
        ("", "",  , null),
        ("", "",  , null),
        ("", "",  , null),
        ("", "",  , null),
        ("", "",  , null),
        ("", "",  , null);