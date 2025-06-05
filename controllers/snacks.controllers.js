const {
  fetchSnackById,
  fetchSnacks,
  insertSnack,
} = require('../models/snacks.models.js');

// error thrown or promises rejected inside async middleware will be automatically passed to next

const getSnackById = (request, response, next) => {
  const { snack_id } = request.params;
  fetchSnackById(snack_id)
    .then((snack) => {
      response.status(200).send({ snack: snack });
    })
    .catch((err) => {
      console.log(err, 'in catch block');
      next(err);
    });
};

const getSnacks = (request, response) => {
  fetchSnacks().then((snacks) => {
    response.status(200).send({ snacks });
  });
};

const postSnacks = (request, response) => {
  const { snack_name, snack_description, price_in_pence, category_id } =
    request.body;

  insertSnack(snack_name, snack_description, price_in_pence, category_id).then(
    (snack) => {
      response.status(201).send({ snack });
    }
  );
};

module.exports = { getSnackById, getSnacks, postSnacks };
