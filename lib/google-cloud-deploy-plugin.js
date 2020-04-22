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
    let config = this.pluginConfig;

    // Copy environment variables to the config if defined.
    for (let key in CONFIG_ENV_MAPPING) {
      if (process.env[key]) {
        config[CONFIG_ENV_MAPPING[key]] = process.env[key];
      }
    }

    this._super.configure.apply(this, arguments);
  },

  upload: function(context) {
    let bucket = this.readConfig('bucket');
    let key = this.readConfig('key');
    let credentials = this.readConfig('credentials');

    let uploadTask = new UploadTask({
      context,
      log: this.log.bind(this),
      hashedZipPath: context.hashedZipPath,
      bucket,
      key,
      credentials
    });

    return uploadTask.run();
  }

});
