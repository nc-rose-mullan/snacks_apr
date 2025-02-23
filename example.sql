DROP DATABASE IF EXISTS nc_snacks;
CREATE DATABASE nc_snacks;

\c nc_snacks

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
  ('Pasty', null, 300),
  ('Gyoza', 'Like a tiny pasty', 450);

SELECT snack_name, price_in_pence FROM snacks
WHERE price_in_pence BETWEEN 100 AND 400;

DELETE FROM snacks
WHERE snack_name = 'Party Rings'
RETURNING snack_name AS deleted_snack_name;

UPDATE snacks
SET snack_description = 'Like a jumbo gyoza'
WHERE snack_name = 'Pasty'
RETURNING *;