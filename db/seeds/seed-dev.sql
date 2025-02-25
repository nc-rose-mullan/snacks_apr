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
('cake'), 
('nuts'),
('sweets'),
('fruit'),
('veg'),
('party food');

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
  ('Party Rings', 'No party is complete without them!', 120, 3),
  ('Hula Hoops', 'The party ring of the crisp world', 80, 1),
  ('Pasty', null, 300, 2),
  ('Nice Biscuits', 'More like ''alright'' biscuits', 150, 3),
  ('Gyoza', 'Like a tiny pasty', 450, null),
  ('Vol-au-vents', 'ooh lala!', 320, 9),
  ('Salted Peanuts', 'The snack that gets your hands salty and your heart happy', 90, 5),
  ('Chocolate Bar', 'Guaranteed to solve almost any problem, temporarily', 130, 6),
  ('Apple Slices', 'When you try to be healthy but need sweetness', 100, 7),
  ('Carrot Sticks', 'Because sometimes you need to dip something that crunches', 110, 8),
  ('Fruit Salad', 'Fingers crossed for grapes', 200, 7),
  ('Rice Cakes', 'Devoid of all joy', 150, null),
  ('Pretzels', 'Knot bad!', 120, 1),
  ('Gummy Worms', 'The early Gummy Bird catches the Gummy Worm', 100, 6),
  ('Cashews', 'Gesundheit', 180, 5),
  ('Freddo', 'How much?!', 200, 6);

  select snack_name, category_name from snacks FULL JOIN categories ON snacks.category_id = categories.category_id;

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
('Eureka, Halifax', 5),
('The Barbican, London', 8),
('Bus Stop, Basingstoke', 3),
('Avebury, Wiltshire', 7),
('Local Library, Reading', 4),
('Giant’s Causeway, Northern Ireland', 9),
('Post Office, Scarborough', 6);

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
