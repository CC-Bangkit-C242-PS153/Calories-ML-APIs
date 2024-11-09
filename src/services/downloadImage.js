const fetch = require('node-fetch');

async function download(id){  
    const response = await fetch(`https://storage.googleapis.com/testing-storage-aulia/test/${id}.png`);
    const buffer = await response.buffer();
    return buffer
}

module.exports = {download}