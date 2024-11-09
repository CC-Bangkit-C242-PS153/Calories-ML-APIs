const { predictClassification } = require('../services/inferenceService');
const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
  const { model } = request.server.app;

  const { label, suggestion } = await predictClassification(model, image);
  const createdAt = new Date().toISOString();

  const data = {
    'result':label,
    'suggestion':suggestion,
    'createdAt':createdAt
  };

  // await storeData(data);

  const response = h.response({
    status:'success',
    message:'Model is predicted successfully',
    data
  });
  response.code(201);
  return response;


}

async function postSubMessage(request, h){
  const message = await decodeBase64Json(request.payload.message.data);
  console.log(message);
  try {
    const response = h.response({
      status:'success',
      message:'Pub/Sub message delivered'
    }).code(204);
    return response;
  } catch (e){
    const response = h.response({
      status:'fail',
      message:e.message
    }).code(500);
    return response;
  }
}

function decodeBase64Json(data) {
  return JSON.parse(Buffer.from(data, 'base64').toString());
}

module.exports = { hello, postSubMessage, postPredictHandler };