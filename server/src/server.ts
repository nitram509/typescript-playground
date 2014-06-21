/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/node/node.d" />

import express = require('express');
var app = express();

var port = 8080;
app.listen(port);
console.log('Express started on port ' + port);