const { hello, postPredictHandler } =  require('./handler');

const routes = [
  {
    path: '/',
    method: 'POST',
    handler: postPredictHandler,
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