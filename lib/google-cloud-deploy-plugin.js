/* jshint node: true */
'use strict';

const ElasticBeanstalkDeployPlugin = require('ember-cli-deploy-elastic-beanstalk/lib/elastic-beanstalk-deploy-plugin');
const UploadTask = require('./tasks/upload');

const CONFIG_ENV_MAPPING = {
  FASTBOOT_GCS_BUCKET: 'bucket',
  FASTBOOT_GCS_KEY: 'key'
};

module.exports = ElasticBeanstalkDeployPlugin.extend({
  
  configure() {
    var config = this.pluginConfig;

    // Copy environment variables to the config if defined.
    for (var key in CONFIG_ENV_MAPPING) {
      if (process.env[key]) {
        config[CONFIG_ENV_MAPPING[key]] = process.env[key];
      }
    }

    this._super.configure.apply(this, arguments);
  },
  
  upload: function(context) {
    let bucket = this.readConfig('bucket');
    let key = this.readConfig('key');

    let uploadTask = new UploadTask({
      context: context,
      log: this.log.bind(this),
      hashedZipPath: context.hashedZipPath,
      bucket: bucket,
      key: key
    });

    return uploadTask.run();
  }
  
});