/* jshint node: true */
'use strict';

const Readable = require('stream').Readable;

let gcloud = require('gcloud');

let storage = gcloud.storage();

class Storage {
  
  upload(bucket, key, file) {
    let upload = storage.bucket(bucket).file(key);
    
    if (typeof file === 'string') {
      let stream = new Readable;
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