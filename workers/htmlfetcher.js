// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var http = require('http');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.scrapeHtml = function(url) {
  var options = { host: url };

  http.get(options, function(response) {
    var data = '';
    response.on('data', function(chunk) {
      data += chunk.toString();
    });
    response.on('end', function() {
      fs.writeFile(archive.paths.archivedSites + '/' + url, data, function(error, content) {
        if (error) {
          console.log(error);
        } else {
          console.log('scraped:', url);
          console.log('data', data);
        }
      });
    });
  });
};

exports.archiveUrls = function() {
  var urls = [];
  archive.readListOfUrls(function(urlsFromList) {
    urlsFromList.forEach(function(url) {
      archive.isUrlArchived(url, function(exists) {
        if (!exists) {
          console.log(url);
          urls.push(url);
          archive.downloadUrls(urls);
        }
      });
    });
  });
  // console.log('archiveUrls:', urls);
  // archive.downloadUrls(urls);
};


