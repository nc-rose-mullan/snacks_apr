const http = require("http");
const db = require("./db/connection")

const server = http.createServer((request, response) => {
    const { method, url } = request
    if (method === "GET" && url === "/api") {
        // Headers
        response.setHeader("content-type", "application/json");
        // Status Code
        response.statusCode = 200;
        // Body
        response.write(JSON.stringify({ msg: "Hiya World" }));
        response.end();
    }
    if (method === "GET" && url === "/api/snacks") {
       return db.query(`SELECT * FROM snacks`).then(({ rows }) => { 
            response.setHeader("content-type", "application.json")
            response.statusCode = 200
            response.write(JSON.stringify({ snacks: rows }))
            response.end()
        })
    }
    if (method === "PATCH" && url === "/api/snacks") { 
        let body = ""
        request.on("data", (packet) => { 
            body += packet
        })
        
        request.on("end", () => { 
            console.log(body)
            const { snack_name, snack_description, price_in_pence, category_id } = JSON.parse(body)

            return db.query(`INSERT INTO snacks (snack_name, snack_description, price_in_pence, category_id) VALUES ($1, $2, $3, $4)`, [snack_name, snack_description, price_in_pence, category_id]).then(() => { 

            })
        })
    }
})
 
server.listen(9090, (err) => { 
    if (err) {
        console.log(err);
    } else { 
        console.log("listening on 9090")
    }
})
