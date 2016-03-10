/// <reference path="typings/tsd.d.ts" />

import fs = require('fs');
import express = require('express');
import expressStaticZip = require('express-static-zip');
import halson = require('halson');

import GoldenTestData = require('./GoldenTestData');

var gtd = new GoldenTestData();

var app = express();
var port = Number(process.env.PORT || 8080);

var STATIC_FOLDER = __dirname + '/static';
var BASE_URI = 'http://localhost:' + port;

// serving 3rd party code from ZIP file, just because statistics in Github pages ;-)
app.use('/hal', expressStaticZip(STATIC_FOLDER + '/hal.zip'));

app.get('/mobs', (req, res) => {
  res.set('Content-Type', 'application/hal+json');
  var mobs = gtd.create();
  var embed = halson({
    'mobList' : mobs
  });
  var resource = halson()
      .addLink('self', {href: '/mobs', title: 'Mob Collection'})
      .addEmbed('mobList', mobs);
  res.send(resource);
});

app.get('/', (req, res) => {
  var accepts = req.accepts(['html', 'json']);
  if (accepts === 'html') {
    res.redirect(302, '/hal/browser.html');
  } else if (accepts === 'json') {
    res.set('Content-Type', 'application/hal+json');
    fs.readFile(STATIC_FOLDER + '/index.hal.json', {
      flag: 'r',
      encoding: 'utf-8'
    }, function (err, data) {
      if (err) throw err;
      data = data.replace(/\$\{baseUri\}/g, BASE_URI);
      res.send(data);
    });
  } else {
    res.send(406, "The requested resource is only capable of generating content in JSON or HTML, but not acceptable according to the Accept headers sent in the request.")
  }
});


app.listen(port);
console.log('Express started on port ' + port);