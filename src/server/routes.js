const { PredictHandler } =  require('./handler');

const routes = [
  {
    path: '/',
    method: 'POST',
    handler: PredictHandler,
  }
];

module.exports = { routes };