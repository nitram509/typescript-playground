/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/express-static-zip/express-static-zip.d.ts" />
/// <reference path="typings/node/node.d" />

import express = require('express');
import expressStaticZip = require('express-static-zip');
import GoldenTestData = require('./GoldenTestData');

var gtd = new GoldenTestData();

var app = express();
var port = Number(process.env.PORT || 8080);

// serving 3rd party code from ZIP file, just because statistics in Github pages ;-)
app.use('/hal', expressStaticZip(__dirname + '/static/hal.zip'));

app.listen(port);
console.log('Express started on port ' + port);