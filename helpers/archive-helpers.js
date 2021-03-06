var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var htmlFetcher = require('../workers/htmlfetcher');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, 'utf8', function(error, content) {
    if (error) {
      console.log(error);
    } else {
      callback(content.split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(this.paths.list, 'utf8', function(error, content) {
    if (error) {
      console.log(error);
    } else {
      var urls = content.split('\n');
      var exists = false;
      urls.forEach(function(item) {
        if (item === url) {
          exists = true;
        }
      });
      callback(exists);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url, function(error, content) {
    if (error) {
      console.log(error);
    } else {
      callback(url);
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(this.paths.archivedSites, function(error, content) {
    if (error) {
      console.log(error);
    } else {
      var exists = false;
      content.forEach(function(item) {
        if (item === url) {
          exists = true;
        }
      });
      return callback(exists);
    }
  });
};

exports.downloadUrls = function(urls) {
  var context = this;
  urls.forEach(function(url) {
    // run htmlFetcher on each url
    var text = htmlFetcher.scrapeHtml(url);
    // pass scraped content into writeFile
    // fs.writeFile(context.paths.archivedSites + '/' + url, text, function(error, content) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     // success
    //   }
    // });
  });
};
