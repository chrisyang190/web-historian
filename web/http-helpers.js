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



// As you progress, keep thinking about what helper functions you can put here!
exports.createResponse = function(path, file, res) {
  fs.readFile(path + '/' + file, function(error, content) {
    if (error) {
      res.writeHead(404);
      res.end();
    } else {
      archive.isUrlArchived(file, function(bool) {
        if (bool) {
          // console.log('The 200 if block causing this');
          res.writeHead(200, {'Content-type': 'text/html'});
          res.end(content, 'utf-8');
        } else {
          console.log(file);
          if (file === 'index.html') {
            console.log('post????');
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(content, 'utf-8');
          } else {
            console.log('in 302');
            archive.addUrlToList(file, function(url) { console.log(url); } );
            res.writeHead(302, {'Content-type': 'text/html'});
            res.end(content, 'utf-8');
          }
        }


        // else if (file === 'index.html') {
        //   console.log('post????');
        //   res.writeHead(200, {'Content-type': 'text/html'});
        //   res.end(content, 'utf-8');
        // } else {
        //   console.log('in 302');
        //   archive.addUrlToList(file, function(url) { console.log(url); } );
        //   res.writeHead(302, {'Content-type': 'text/html'});
        //   res.end(content, 'utf-8');
        // }
      });
    }
  });
};