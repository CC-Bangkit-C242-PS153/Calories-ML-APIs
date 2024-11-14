const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME

async function download(data){
  const file = storage.bucket(bucketName).file(`prediction/${data.inferenceId}.${data.type.ext}`);
  const [contents] = await file.download(); 
  return contents;
}

module.exports = { download };