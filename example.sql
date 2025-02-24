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
  price_in_pence INT
);

INSERT INTO snacks
  (snack_name, snack_description, price_in_pence)
VALUES
  ('Party Rings', 'No party is complete without them!', 120),
  ('Hula Hoops', 'The party ring of the crisp world', 80),
  ('Pasty', null, 300, 2),
  ('Nice Biscuits', 'More like ''alright'' biscuits', 150),
  ('Gyoza', 'Like a tiny pasty', 450),
  ('Vol-au-vents', 'ooh lala!', 320);

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

