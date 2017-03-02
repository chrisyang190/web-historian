var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var fs = require('fs');


exports.handleRequest = function (req, res) {
  if (req.url.slice(1)) {
    httpHelpers.createResponse(archive.paths.archivedSites, req.url.slice(1), res);
  } else {
    httpHelpers.createResponse(archive.paths.siteAssets, 'index.html', res);
  }
};
