/* jshint node: true */
'use strict';

const Readable = require('stream').Readable;
const gcloud = require('gcloud');

class Storage {
  
  upload(bucket, key, file) {

    const storage = gcloud.storage();

    let upload = storage.bucket(bucket).file(key);
    
    if (typeof file === 'string') {
      let stream = new Readable();
      stream.push(file);
      stream.push(null);
      file = stream;
    }
    
    return new Promise(function(resolve, reject){
      file.pipe(upload.createWriteStream())
        .on('error', function(error){
          reject('Failed to upload file ' + key + ' - ' + error.message);
        })
        .on('finish', resolve);
    });
  }
  
}

module.exports = Storage;