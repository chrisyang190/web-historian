var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var fs = require('fs');


exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url.slice(1)) {
      httpHelpers.createGetResponse(archive.paths.archivedSites, req.url.slice(1), res);
    } else {
      httpHelpers.createGetResponse(archive.paths.siteAssets, 'index.html', res);
    }
  }

  if (req.method === 'POST') {
    httpHelpers.createPostResponse(archive.paths.list, req.url.slice(1), req, res);
  }

// if method is GET  
  // if it on list
    // if it is archived
      // use 200, archive.paths.archivedSites + req.url 
    // else if not archived, 
      // use 200 archive.paths.archivedSites + ./loading.html
  // else use 200, archive.paths.siteAssets + index.html
  // else 404

// else if method is POST
  // if NOT on the list
    // if it is archived
        // use 302, archive.paths.archivedSites + req.url 
      // else if not archived, archive.paths.archivedSites + ./loading
        // 
    // else use 302, archive.paths.siteAssets + index.html


};
