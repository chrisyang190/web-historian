var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var htmlFetcher = require('../workers/htmlfetcher');
var CronJob = require('cron').CronJob;


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

  var job = new CronJob('00 * * * * 0-6', function() {
    htmlFetcher.archiveUrls();
  }, null, true, 'America/Los_Angeles');
  // setInterval(htmlFetcher.archiveUrls, 5000);
};

