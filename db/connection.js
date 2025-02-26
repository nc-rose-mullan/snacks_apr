const { Pool } = require("pg");

const pool = new Pool();

const ENV = process.env.NODE_ENV || 'development'

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` })

// Queries:

function getSnacks() {
    return pool.query('SELECT * FROM snacks').then(({ rows }) => {
        console.log(rows);
        pool.end();
    });
}

// getSnacks()

function getSnackById(id) { 
    return pool.query(`SELECT * FROM snacks WHERE snack_id = ${id}`).then(({ rows }) => { 
        console.log(rows[0])
        pool.end()
    })
}

getSnackById(3)



console.log("the ENV is:", ENV)

console.log("connected to:", process.env.PGDATABASE)

module.exports = pool