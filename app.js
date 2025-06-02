const express = require("express");
const db = require("./db/connection.js")

const app = express();

app.get('/api', (request, response) => { 
    response.status(200).send({ msg: "Hiya World from express" })
})

app.get('/api/snacks', (request, response) => {
    return db.query(`SELECT * FROM snacks`).then(({ rows }) => { 
        response.status(200).send({snacks: rows})
    })
})

app.listen(8080, (err) => { 
    if (err) {
        console.log(err);
    } else { 
        console.log("listening on 8080")
    }
})