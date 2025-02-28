const seed = require("./seed");
const data = require("../data/dev-data")

const db = require("../connection")

seed(data).then(() => { 
    db.end()
})