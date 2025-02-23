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
  category_id INT
);

INSERT INTO snacks
  (snack_name, snack_description, price_in_pence, category_id)
VALUES
  ('Party Rings', 'No party is complete without them!', 120, 3),
  ('Hula Hoops', 'The party ring of the crisp world', 80, 1),
  ('Pasty', null, 300, 2),
  ('Nice Biscuits', 'More like ''alright'' biscuits', 150, 3),
  ('Gyoza', 'Like a tiny pasty', 450, 2),
  ('Vol-au-vents', 'ooh lala!', 320, 2);

CREATE TABLE vending_machines (
    vm_id SERIAL PRIMARY KEY,
    vm_location VARCHAR(100),
    vm_rating INT
);

INSERT INTO vending_machines(vm_location, vm_rating)
VALUES 
('Cobham Services floor 1', 10),
('The Olympiad, Chippenham', 2),
('Manchester Arndale', 4),
('Eureka, Halifax', 5);

CREATE TABLE maintenance_records (
    record_id SERIAL PRIMARY KEY,
    vm_id INT,
    last_serviced DATE,
    description VARCHAR
);

INSERT INTO maintenance_records (vm_id, last_serviced, description)
VALUES
    (3, '2025-01-15', 'Upgraded to pump out enticing, generic snack smell'),
    (2, '2025-01-20', 'Replaced snack tray with a trampoline for extra bouncy snacks'),
    (4, '2025-02-01', 'Programmed the vending machine to speak in an annoying baby voice'),
    (2, '2025-02-10', 'Replaced the cooling system with a picture of Rose'),
    (1, '2025-02-18', 'Taught the payment system how to beatbox'),
    (1, '2025-02-25', 'Installed disco lights for the ultimate snack party vibe'),
    (3, '2025-02-28', 'Refilled machine with invisible snacks for a ghostly experience'),
    (1, '2025-03-02', 'Upgraded the vending machine to provide pre-chewed snacks');
