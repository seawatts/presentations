/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let env = EmberApp.env();
  let isProductionLikeBuild = false;
  if (env === 'staging' || env === 'production') {
    isProductionLikeBuild = true;
  }

  let fingerprint = {
    enabled: isProductionLikeBuild,
  };

  let app = new EmberApp(defaults, {
    dotEnv: {
      clientAllowedKeys: [
        'AWS_ACCESS_KEY',
        'AWS_ACCESS_KEY_PROD',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_SECRET_ACCESS_KEY_PROD',
        'CIRCLE_CI_TOKEN',
        'GITHUB_TOKEN',
      ]
    },
    fingerprint,
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
