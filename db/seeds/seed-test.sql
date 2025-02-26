DROP DATABASE IF EXISTS nc_snacks_test;
CREATE DATABASE nc_snacks_test;

\c nc_snacks_test

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(40) NOT NULL
);

INSERT INTO categories(category_name)
VALUES
('category A'),
('category B'),
('category C'),
('category D');

CREATE TABLE snacks(
  snack_id SERIAL PRIMARY KEY,
  snack_name VARCHAR(40) NOT NULL,
  snack_description VARCHAR(100),
  price_in_pence INT,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

INSERT INTO snacks
  (snack_name, snack_description, price_in_pence, category_id)
VALUES
  ('Snack A', 'Description of Snack A', 120, 1),
  ('Snack B', 'Description of Snack B', 80, 1),
  ('Snack C', null, 300, 2),
  ('Snack D', 'Description of Snack D', 150, null),
  ('Snack E', 'Description of Snack E', 450, 3),
  ('Snack F', 'Description of Snack F', 320, 2);

CREATE TABLE vending_machines (
    vm_id SERIAL PRIMARY KEY,
    vm_location VARCHAR(100),
    vm_rating INT
);

INSERT INTO vending_machines(vm_location, vm_rating)
VALUES 
('Vending Machine A', 10),
('Vending Machine B', 2),
('Vending Machine C', 4),
('Vending Machine D', 5);

CREATE TABLE vending_machines_snacks(
  vm_id INT REFERENCES vending_machines(vm_id),
  snack_id INT REFERENCES snacks(snack_id)
);

INSERT INTO vending_machines_snacks (vm_id, snack_id)
VALUES 
(1, 2),
(1, 4), 
(1, 5), 
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(3, 2),
(4, 1), 
(4, 5);

SELECT * FROM snacks;
SELECT * FROM categories;
SELECT * FROM vending_machines;