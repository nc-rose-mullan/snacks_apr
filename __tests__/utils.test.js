const { createLookUp } = require("../db/seeds/seed-utils");


describe("createLookUp", () => {
   test("returns an empty object when passed an empty array", () => {
       const input = []
       const expected = {}
       const actual = createLookUp(input)
       expect(actual).toEqual(expected)
   })
   test("returns an object with a single key-value pair when passed an array with a single object", () => {
       const input = [{ category_id: 10, category: "a cool category" }]
       const expected = { "a cool category": 10 }
       const actual = createLookUp(input, "category", "category_id")
       expect(actual).toEqual(expected)
   })
   test("returns an object with multiple key-value pairs when passed an array with multiple objects", () => {
       const input = [
           { category_id: 10, category: "a cool category" },
           { category_id: 2, category: "some other string" },
           { category_id: 315, category: "and another one" },
          
       ]
       const expected = {
           "a cool category": 10,
           "some other string": 2,
           "and another one": 315
        }
       const actual = createLookUp(input, "category", "category_id")
       expect(actual).toEqual(expected)
   })
   test("does not mutate original object", () => {
       const input = [{ category_id: 10, category: "a cool category" }]
       const inputCopy = JSON.parse(JSON.stringify(input))


       createLookUp(input, "category", "category_id")
       expect(input).toEqual(inputCopy)
   })


})
