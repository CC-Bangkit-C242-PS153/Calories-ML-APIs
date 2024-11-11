const { Firestore } = require('@google-cloud/firestore');

async function storeData(userId, inferenceId, data) {
  const db = new Firestore();
  return db.collection('users')
        .doc(userId)
        .collection('predictions')
        .doc('type')
        .collection('calories')
        .doc(inferenceId)
        .set(data);
}

module.exports = {storeData};