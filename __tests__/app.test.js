const request = require('supertest');
const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data/index.js');
const db = require('../db/connection.js');
const app = require('../app.js');
const endpoints = require('../endpoints.json')

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe('/api', () => { 
  test('GET - 200 and responds with an object describing endpoints', () => { 
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => { 
        expect(body.endpoints).toEqual(endpoints)
      })
  })
})
describe('/api/snacks/:snack_id', () => {
  test('GET - 200: Responds with the snack object of the correct id', () => {
    return request(app)
      .get('/api/snacks/3')
      .expect(200)
      .then(({ body }) => {
        const {
          snack_id,
          snack_name,
          snack_description,
          price_in_pence,
          category_id,
        } = body.snack;
        expect(snack_id).toBe(3);
        expect(typeof snack_name).toBe('string');
        expect(typeof snack_description).toBe('string');
        expect(typeof price_in_pence).toBe('number');
        expect(typeof category_id).toBe('number');
      });
  });
  test('GET - 400: responds with an error if id is not valid', () => {
    return request(app)
      .get('/api/snacks/notanum')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('bad request');
      });
  });
  test('GET - 404: responds with an error if the snack does not exist', () => {
    return request(app)
      .get('/api/snacks/99')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found');
      });
  });
});

describe('/api/snacks', () => {
  test('POST - 201: Posts a new snack and responds with the newly posted snack', () => {
    return request(app)
      .post('/api/snacks')
      .send({
        snack_name: 'Snickers',
        snack_description: "You're not you when you're hungry",
        price_in_pence: 130,
        category_id: 2,
      })
      .expect(201)
      .then(({ body }) => {
        const {
          snack_id,
          snack_name,
          snack_description,
          price_in_pence,
          category_id,
        } = body.snack;
        expect(typeof snack_id).toBe('number');
        expect(typeof snack_name).toBe('string');
        expect(typeof snack_description).toBe('string');
        expect(typeof price_in_pence).toBe('number');
        expect(typeof category_id).toBe('number');
      });
  });
});

describe('GET: /api/snacks', () => {
  test('200: Responds with a list of all snacks', () => {
    return request(app)
      .get('/api/snacks')
      .expect(200)
      .then(({ body }) => {
        const snacks = body.snacks;
        expect(snacks.length).toBe(6);
        snacks.forEach((snack) => {
          expect(typeof snack.snack_id).toBe('number');
          expect(typeof snack.snack_name).toBe('string');
          expect(typeof snack.snack_description).toBe('string');
          expect(typeof snack.price_in_pence).toBe('number');
          expect(typeof snack.category_id).toBe('number');
        });
      });
  });
  test('200: accepts a category_id query which responds with only snacks with that category_id', () => {
    return request(app)
      .get('/api/snacks?category_id=2')
      .expect(200)
      .then(({ body }) => {
        const { snacks } = body;
        expect(snacks).toHaveLength(3);
        snacks.forEach((snack) => {
          expect(snack.category_id).toBe(2);
        });
      });
  });
  test('200: responds with an empty array if the category exists but there are no snacks', () => {
    return request(app)
      .get('/api/snacks?category_id=4')
      .expect(200)
      .then(({ body }) => {
        const { snacks } = body;
        expect(snacks).toEqual([]);
      });
  });
  test('404: responds with an error message if the category does not exist', () => {
    return request(app)
      .get('/api/snacks?category_id=10')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found');
      });
  });
});
