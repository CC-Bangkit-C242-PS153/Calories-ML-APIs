const fetch = require('node-fetch');

async function download(data){
  const response = await fetch(`gs://fitcal/prediction/${data.inferenceId}.${data.type.ext}
`);
  const buffer = await response.buffer();
  return buffer;
}

module.exports = { download };