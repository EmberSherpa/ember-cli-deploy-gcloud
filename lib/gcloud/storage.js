/* jshint node: true */
'use strict';

const { Storage } = require('@google-cloud/storage');

class GoogleCloudStorage {
  constructor(credentials) {
    const options = {};
    if (credentials) {
      options.credentials = credentials;
    }

    this.storage = new Storage(options);
  }

  upload(bucket, key, filepath) {
    return this.storage.bucket(bucket).upload(
      filepath,
      {
        destination: key
      }
    );
  }
}

module.exports = GoogleCloudStorage;
