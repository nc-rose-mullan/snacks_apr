const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data/index.js")

const db = require("../db/connection")

seed(data).then(() => { 
    db.end()
})

describe("a bunch of tests", () => { 
    test("a single test", () => { })
})