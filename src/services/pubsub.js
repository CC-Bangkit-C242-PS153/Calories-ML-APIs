const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

async function publishPubSubMessage( data) {
  const buffer = Buffer.from(JSON.stringify(data));
  await pubsub.topic('Result-ML').publish(buffer);
}

module.exports = { publishPubSubMessage };