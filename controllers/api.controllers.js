const getApi = (request, response) => {
  response.status(200).send({ msg: 'Hiya World from express' });
};

module.exports = { getApi };
