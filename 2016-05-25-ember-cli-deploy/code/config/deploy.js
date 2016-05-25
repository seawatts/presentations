/* jshint node: true */
'use strict';

var pluginPack = require('ember-cli-deploy-sm-pack');

module.exports = function(deployTarget) {
  return pluginPack.getConfiguration('', 'Code', deployTarget);
};

