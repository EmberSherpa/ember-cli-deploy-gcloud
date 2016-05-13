/* jshint node: true */
'use strict';

const GoogleCloudDeployPlugin = require('./lib/google-cloud-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-gcloud',
  
  createDeployPlugin: function(options) {
    return new GoogleCloudDeployPlugin({
      name: options.name
    });
  }
};
