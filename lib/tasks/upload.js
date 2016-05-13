/* jshint node: true */
'use strict';

const GoogleCloudStorage = require('../gcloud/storage');

const fs = require('fs');
const path = require('path');

class GoogleCloudStorageUploadTask {

  constructor(options) {
    this.context = options.context;
    this.log = options.log;
    this.bucket = options.bucket;
    this.key = options.key;
    this.hashedZipPath = options.hashedZipPath;
    this.hashedZipKey = path.basename(this.hashedZipPath);
    
    this.storage = new GoogleCloudStorage();
  }
  
  
  run() {
    return this.uploadHashedZip()
      .then(() => this.uploadVersionFile());
  }
  
  uploadHashedZip() {
    let hashedZipPath = this.hashedZipPath;
    let bucket = this.bucket;

    this.log('uploading ' + hashedZipPath + ' to ' + bucket, { verbose: true });

    let file = fs.createReadStream(hashedZipPath);

    return this.storage.upload(bucket, this.hashedZipKey, file);
  }
 
  uploadVersionFile() {
    let versionFile = {
      bucket: this.bucket,
      key: this.hashedZipKey
    };

    versionFile = JSON.stringify(versionFile);

    return this.storage.upload(this.bucket, this.key, versionFile);
  }
  
}

module.exports = GoogleCloudStorageUploadTask;