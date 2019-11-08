# ember-cli-deploy-gcloud
`ember-cli-deploy-gcloud` makes it easier to deploy Ember FastBoot applications to Google App Engine. It's like [ember-cli-deploy-fastboot-app-server-aws](https://github.com/ember-cli-deploy/ember-cli-deploy-fastboot-app-server-aws) but for the Google Cloud Platform. It:

- zips the built assets
- uploads the zip to Google Cloud Storage
- uploads a manifest file that indicates to [fastboot-gcloud-storage-downloader](https://github.com/EmberSherpa/fastboot-gcloud-storage-downloader) where to fetch the zip.

## FYI
This project only handles deploying the FastBoot server. It does not upload app code to Google Storage bucket. 
For that, you need to use [`ember-cli-deploy-gcloud-storage`](https://github.com/knownasilya/ember-cli-deploy-gcloud-storage)

## `ember-cli-deploy-gcloud <project_id>` blueprint

Creates `/fastboot-server` directory with code necessary to deploy FastBoot to Google App Engine. 

To setup, 

1. `ember g ember-cli-deploy-gcloud <project_id>`
2. `cd server`
3. `npm run deploy`

## Usage as `ember-cli-deploy` plugin

```
// config/deploy.js

ENV['gcloud'] = {
  bucket: <gcloud-storage-bucket>,
  key: <path-for-manifest-file>, // e.g. 'fastboot-deploy-info.json
  // optional
  credentials: {
    private_key: <google-cloud-private-key>
    client_email: <google-cloud-client-email>
  }
};
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
