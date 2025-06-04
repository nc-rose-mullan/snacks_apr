const {
  fetchSnackById,
  fetchSnacks,
  insertSnack,
} = require('../models/snacks.models.js');

const getSnackById = (request, response) => {
  const { snack_id } = request.params;
  fetchSnackById(snack_id).then((snack) => {
    response.status(200).send({ snack: snack });
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
      console.log(snack);
      response.status(201).send({ snack });
    }
  );
};

module.exports = { getSnackById, getSnacks, postSnacks };
