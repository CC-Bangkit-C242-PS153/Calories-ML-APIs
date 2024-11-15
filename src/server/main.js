const InputError = require('../exceptions/InputError');
const Hapi = require('@hapi/hapi');
const { routes } = require('./routes');
const { loadModel } = require('./../services/loadModel');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port:process.env.PORT || 8080,
    // host:'localhost',
    routes: {
      cors:{
        origin:['*']
      }
    }
  });

  const model = await loadModel();
  server.app.model = model;

  server.route(routes);
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response instanceof InputError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message
      });
      newResponse.code(400);
      return newResponse;
    }

    if (response.isBoom) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message
      });
      newResponse.code(413);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
};

init();