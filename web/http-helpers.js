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
exports.createGetResponse = function(path, file, res) {
  fs.readFile(path + '/' + file, function(error, content) {
    if (error) {
      console.log('error');
      res.writeHead(404);
      res.end();
    } else {
      archive.isUrlArchived(file, function(exists) {
        if (exists) {
          // console.log('The 200 if block causing this');
          res.writeHead(200, {'Content-type': 'text/html'});
          res.end(content, 'utf-8');
        } else {
          if (file === 'index.html') {
            // console.log('post????');
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(content, 'utf-8');
          } 
          // else if (method === 'POST') {
          //   archive.addUrlToList(file, function(url) { console.log(url); } );
          //   console.log('file in 302', file);
          //   res.writeHead(302, {'Content-type': 'text/html'});
          //   res.end(content, 'utf-8');
          // }
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

exports.createPostResponse = function(path, file, req, res) {
  // console.log('p1', path);
  // fs.readFile(path, function(error, content) {
  //   if (error) {
  //     console.log(error);
  //   } else {
      // console.log('file!!', file);
  var string = '';
  req.on('data', function(data) {
    string += data;
    string = string.slice(4) + '\n';
  }).on('end', function() {
    archive.isUrlInList(string, function(exists) {
      console.log('string:', string);
      if (!exists) {
        archive.addUrlToList(string, function(url) { console.log(url); } );
        // console.log('file in 302', file);
        res.writeHead(302, {'Content-type': 'text/html'});
        res.end('content', 'utf-8');
      } else {
        res.writeHead(302, {'Content-type': 'text/html'});
        res.end('content', 'utf-8');
      }
    });
  });
  //   }
  // });

};



