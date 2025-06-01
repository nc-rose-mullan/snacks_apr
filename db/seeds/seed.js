const db = require("../connection.js")
const format = require("pg-format")
const {createLookUp} = require("../seeds/seed-utils.js")


function seed({ snacksData, categoriesData, vendingMachineData }) {
   return db.query(`DROP TABLE IF EXISTS vending_machines`)
       .then(() => {
           return db.query(`DROP TABLE IF EXISTS snacks`)
       }).then(() => {
           return db.query(`DROP TABLE IF EXISTS categories`)
       }).then(() => {
           return db.query(`CREATE TABLE categories(
               category_id SERIAL PRIMARY KEY,
               category_name VARCHAR(40) NOT NULL);`
           )
       }).then(() => {
           return db.query(`CREATE TABLE snacks(
               snack_id SERIAL PRIMARY KEY,
               snack_name VARCHAR(40) NOT NULL,
               snack_description VARCHAR(100),
               price_in_pence INT,
               category_id INT,
               FOREIGN KEY (category_id) REFERENCES categories(category_id));`
           )
       }).then(() => {
           return db.query(`CREATE TABLE vending_machines (
               vm_id SERIAL PRIMARY KEY,
               vm_location VARCHAR(100),
               vm_rating INT);`
           )
       }).then(() => {


           const formattedCategoryValues = categoriesData.map(({category_name}) => {
               return [category_name]
           })
           const sqlString = format(`INSERT INTO categories(category_name) VALUES %L RETURNING *`, formattedCategoryValues)


           return db.query(sqlString)
       }).then(({ rows }) => {
           const categoriesLookUp = createLookUp(rows, "category_name", "category_id")


           const formattedSnackValues = snacksData.map(({ snack_name, snack_description, price_in_pence, category }) => {
               return [snack_name, snack_description, price_in_pence, categoriesLookUp[category]]
           })


           const sqlString = format(`INSERT INTO snacks (snack_name, snack_description, price_in_pence, category_id) VALUES %L`, formattedSnackValues)


           return db.query(sqlString)
       }).then(() => {
           const formattedVMValues = vendingMachineData.map((vm) => {
               return [vm.location, vm.rating]
           })
           const sqlString = format(`INSERT INTO vending_machines (vm_location, vm_rating) VALUES %L`, formattedVMValues)


           return db.query(sqlString)
       })
      
   }

   module.exports = seed