const db = require('../db/connection');

const fetchCategories = (category_id) => {
  return db
    .query('SELECT * FROM categories WHERE category_id = $1', [category_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'not found' });
      }
    });
};

module.exports = fetchCategories;
