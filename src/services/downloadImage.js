const fetch = require('node-fetch');

async function download(data){
  const response = await fetch(`https://storage.googleapis.com/testing-storage-aulia/test/${data.inferenceId}.${data.type.ext}`);
  const buffer = await response.buffer();
  return buffer;
}

module.exports = { download };