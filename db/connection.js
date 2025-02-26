const { Pool } = require("pg");

const pool = new Pool();

const ENV = process.env.NODE_ENV || 'development'

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` })

if (!process.env.PGDATABASE) {
    throw new Error("no PGDATABASE set");
} else { 
    console.log("connected to:", process.env.PGDATABASE)
}


getSnackById(3)



console.log("the ENV is:", ENV)

console.log("connected to:", process.env.PGDATABASE)

module.exports = pool