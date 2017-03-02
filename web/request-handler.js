var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  res.end(archive.paths.siteAssets);
  fs.readFile('index.html', function(error, content) {
    if (error) {
      // console.log(error);
      response.writeHead(500);
      response.end();
    } else {
      console.log('writing file');
      response.writeHead(200, {'Content-type': 'text/html'});
      response.end(content, 'utf-8');
    }
  });
};
