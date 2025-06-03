const request = require("supertest")
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js")
const db = require("../db/connection.js")
const app = require('../app.js')

beforeEach(() => { 
   return seed(data)
})

afterAll(() => { 
   return db.end() 
})

describe("/api/snacks/:snack_id", () => { 
    test("GET - 200: Responds with the snack object of the correct id", () => { 
        return request(app)
            .get("/api/snacks/3")
            .expect(200)
            .then(({body}) => { 
                const { snack_id, snack_name, snack_description, price_in_pence, category_id } = body.snack
                expect(snack_id).toBe(3)
                expect(typeof snack_name).toBe("string")
                expect(typeof snack_description).toBe("string")
                expect(typeof price_in_pence).toBe("number")
                expect(typeof category_id).toBe("number")
            })
    })
});

describe("/api/snacks", () => { 
    test("POST - 201: Posts a new snack and responds with the newly posted snack", () => { 
        return request(app)
            .post("/api/snacks")
            .send({
                snack_name: "Snickers",
                snack_description: "You're not you when you're hungry",
                price_in_pence: 130,
                category_id: 2
            })
            .expect(201)
            .then(({ body }) => { 
                const { snack_id, snack_name, snack_description, price_in_pence, category_id}  = body.snack
                expect(typeof snack_id).toBe("number")
                expect(typeof snack_name).toBe("string")
                expect(typeof snack_description).toBe("string")
                expect(typeof price_in_pence).toBe("number")
                expect(typeof category_id).toBe("number")
            })
    })
})