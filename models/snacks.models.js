const db = require('../db/connection');

const fetchSnackById = (id) => {
  return db
    .query(`SELECT * FROM snacks WHERE snack_id = $1`, [id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: 'not found' });
      }
      const snack = rows[0];
      return snack;
    });
};

const fetchSnacks = (category_id) => {
  const acceptableQueries = [];
  const queryParams = [];
  let queryString = 'SELECT * FROM snacks ';

  if (category_id) {
    queryParams.push(category_id);
    queryString += `WHERE category_id = $${queryParams.length}`;
  }

  return db.query(queryString, queryParams).then(({ rows }) => {
    return rows;
  });
};

const insertSnack = (
  snack_name,
  snack_description,
  price_in_pence,
  category_id
) => {
  return db
    .query(
      `INSERT INTO snacks (snack_name, snack_description, price_in_pence, category_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [snack_name, snack_description, price_in_pence, category_id]
    )
    .then(({ rows }) => {
      const snack = rows[0];
      return snack;
    });
};

module.exports = { fetchSnackById, fetchSnacks, insertSnack };
