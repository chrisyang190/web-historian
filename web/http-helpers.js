var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  archive.paths.siteAssets;
};


var createResponse = function(statusCode, res, content) {
  res.writeHead(statusCode, {'Content-type': 'text/html'});
  res.end(content, 'utf-8');
};

// As you progress, keep thinking about what helper functions you can put here!
exports.createGetResponse = function(path, file, res) {
  if (file === 'index.html') {
    fs.readFile(path + '/' + file, function(error, content) {
      createResponse(200, res, content);
    });
  } else {
    archive.isUrlArchived(file, function(exists) {
      if (exists) {
        fs.readFile(path + '/' + file, function(error, content) {
          createResponse(200, res, content);
        });
      } else {
        archive.isUrlInList(file, function(inList) {
          if (inList) {
            // file = 'loading.html';
            console.log('in loading');
            fs.readFile(archive.paths.siteAssets + '/loading.html', function(error, content) {
              createResponse(200, res, content);
            });
          } else {
            res.writeHead(404);
            res.end();
          }
        });
      }
    });
  }
};

exports.createPostResponse = function(path, file, req, res) {
  var string = '';
  req.on('data', function(data) {
    string += data;
    console.log('string before slice:', string);
    string = string.slice(4) + '\n';
  }).on('end', function() {
    archive.isUrlInList(string, function(exists) {
      console.log('string:', string);
      if (!exists) {
        archive.addUrlToList(string, function(url) { console.log(url); } );
        fs.readFile(archive.paths.siteAssets + '/loading.html', function(error, content) {
          createResponse(302, res, content);
        });
      } else {
        fs.readFile(path + '/' + file, function(error, content) {
          createResponse(302, res, content);
        });
      }


      // res.writeHead(302, {'Content-type': 'text/html'});
      // res.end(file, 'utf-8');
    });
  });
};


