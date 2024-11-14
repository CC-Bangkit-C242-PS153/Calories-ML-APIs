const fetch = require('node-fetch');

async function download(data){
  const response = await fetch(`https://storage.cloud.google.com/fitcal/prediction/${data.inferenceId}.${data.type.ext}?authuser=4
`);
  const buffer = await response.buffer();
  return buffer;
}

module.exports = { download };