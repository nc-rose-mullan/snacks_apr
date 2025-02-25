DROP DATABASE IF EXISTS nc_snacks;
CREATE DATABASE nc_snacks;

\c nc_snacks

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(40) NOT NULL
);

INSERT INTO categories(category_name)
VALUES
('crisps'),
('pastry'),
('biscuits'),
('cake');

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
  ('Party Rings', 'No party is complete without them!', 120, 1),
  ('Hula Hoops', 'The party ring of the crisp world', 80, 1),
  ('Pasty', null, 300, 2),
  ('Nice Biscuits', 'More like ''alright'' biscuits', 150, null),
  ('Gyoza', 'Like a tiny pasty', 450, 3),
  ('Vol-au-vents', 'ooh lala!', 320, 2);


-- category_name: no. of snacks

SELECT * FROM snacks RIGHT JOIN categories ON snacks.snacks.category_id = categories.category_id;

-- SELECT categories.category_name, COUNT(snacks.snack_id) AS snack_count FROM snacks RIGHT JOIN categories ON snacks.category_id = categories.category_id GROUP BY categories.category_name;




CREATE TABLE vending_machines (
    vm_id SERIAL PRIMARY KEY,
    vm_location VARCHAR(100),
    vm_rating INT
);

INSERT INTO vending_machines(vm_location, vm_rating)
VALUES 
('Cobham Services', 10),
('The Olympiad, Chippenham', 2),
('Manchester Arndale', 4),
('Eureka, Halifax', 5);

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


-- SELECT * FROM vending_machines_snacks JOIN vending_machines ON vending_machines.vm_id = vending_machines_snacks.vm_id JOIN snacks ON snacks.snack_id = vending_machines_snacks.snack_id;