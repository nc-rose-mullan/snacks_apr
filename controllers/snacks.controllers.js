const fetchCategories = require('../models/categories.models.js');
const {
  fetchSnackById,
  fetchSnacks,
  insertSnack,
} = require('../models/snacks.models.js');

// error thrown or promises rejected inside async middleware will be automatically passed to next

const getSnackById = (req, res, next) => {
  const { snack_id } = req.params;
  const { order , sort_by } = req.query
  fetchSnackById(snack_id)
    .then((snack) => {
      res.status(200).send({ snack: snack });
    })
    .catch((err) => {
      console.log(err, 'in catch block');
      next(err);
    });
};

const getSnacks = (request, response, next) => {
  const { category_id } = request.query;

  const promises = [fetchSnacks(category_id)];

  if (category_id) {
    promises.push(fetchCategories(category_id));
  }

  Promise.all(promises)
    .then((resolvedPromises) => {
      const snacks = resolvedPromises[0];
      response.status(200).send({ snacks });
    })
    .catch(next);
};

const postSnacks = (req, res) => {
  const { snack_name, snack_description, price_in_pence, category_id } =
    req.body;

  insertSnack(snack_name, snack_description, price_in_pence, category_id).then(
    (snack) => {
      res.status(201).send({ snack });
    }
  );
};

module.exports = { getSnackById, getSnacks, postSnacks };
