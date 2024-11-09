const { predictClassification } = require('../services/inferenceService');
const { download } = require('./../services/downloadImage');
const { publishPubSubMessage } = require('./../services/pubsub');
const { storeData } = require('./../services/storeData');

async function PredictHandler(request, h) {
  const pubsubMessage = await decodeBase64Json(request.payload.message.data);
  const createdAt = new Date().toISOString();
  const image = await download(pubsubMessage);
  const { model } = request.server.app;
  const { label, suggestion } = await predictClassification(model, image);

  const data = {
    'result':label,
    'suggestion':suggestion,
    'createdAt':createdAt,
  };
  console.log(pubsubMessage)
  console.log(data)
  
  await storeData(pubsubMessage.id,data);
  // await publishPubSubMessage

  const response = h.response({
    status:'success',
    message:'Model is predicted successfully',
    data
  });
  response.code(201);
  return response;


}

async function postSubMessage(request, h){
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

module.exports = { postSubMessage, PredictHandler };