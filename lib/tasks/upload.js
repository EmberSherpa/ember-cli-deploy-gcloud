/* jshint node: true */
'use strict';

const GoogleCloudStorage = require('../gcloud/storage');

const fs = require('fs');
const path = require('path');
const util = require('util');

class GoogleCloudStorageUploadTask {

  constructor(options) {
    this.context = options.context;
    this.log = options.log;
    this.bucket = options.bucket;
    this.key = options.key;
    this.hashedZipPath = options.hashedZipPath;
    this.hashedZipKey = path.basename(this.hashedZipPath);

    this.storage = new GoogleCloudStorage(options.credentials);
  }

  async run() {
    await this.uploadHashedZip();
    await this.uploadVersionFile();
  }

  uploadHashedZip() {
    this.log(`uploading ${this.hashedZipPath} to ${this.bucket} at ${this.hashedZipKey}`, { verbose: true });

    return this.storage.upload(
      this.bucket,
      this.hashedZipKey,
      path.resolve(this.hashedZipPath)
    );
  }

  async uploadVersionFile() {
    this.log(`uploading version file to ${this.bucket} at ${this.key}`, { verbose: true });

    const dir = path.dirname(this.hashedZipPath);
    const filename = path.resolve(path.join(dir, this.key));

    const writeFile = util.promisify(fs.writeFile);
    await writeFile(
      filename,
      JSON.stringify({
        bucket: this.bucket,
        key: this.hashedZipKey
      })
    );

    return this.storage.upload(this.bucket, this.key, filename);
  }
}

module.exports = GoogleCloudStorageUploadTask;
