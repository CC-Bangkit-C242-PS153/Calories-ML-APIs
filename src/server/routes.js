const { PredictHandler } =  require('./handler');

const routes = [
  {
    path: '/',
    method: 'POST',
    handler: PredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes:100000
      }
    }
  }
];

module.exports = { routes };