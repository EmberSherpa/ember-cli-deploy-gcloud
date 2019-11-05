/* jshint node: true */
'use strict';

const Readable = require('stream').Readable;
const { Storage } = require('@google-cloud/storage');

class GoogleCloudStorage {

  constructor(credentials) {
    const options = {};
    if (credentials) {
      options.credentials = credentials;
    }

    this.storage = new Storage(options);
  }

  upload(bucket, key, file) {
    let upload = this.storage.bucket(bucket).file(key);

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

module.exports = GoogleCloudStorage;
