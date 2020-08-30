"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import cors from 'cors';
//import compression from 'compression';
var fs = require('fs');

var http = require('http');

var https = require('https');

var hskey = process.env.NODE_ENV === 'production' ? fs.readFileSync('/apps/certs/gorilla.lk/gorilla_lk_key.key', 'utf8') : '';
var hscert = process.env.NODE_ENV === 'production' ? fs.readFileSync('/apps/certs/gorilla.lk/gorilla.lk.crt', 'utf8') : '';
var ca = process.env.NODE_ENV === 'production' ? fs.readFileSync('/apps/certs/gorilla.lk/gorilla_lk.ca-bundle', 'utf8') : '';
var options = {
  key: hskey,
  cert: hscert,
  ca: ca
}; //create instance

var app = (0, _express.default)(); //app.use(cors());
//app.use(compression());

app.use(_express.default.static('build')); //enable gzip for prod env

console.log('process.env.NODE_ENV : ' + process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });
}

app.disable('etag');
app.use('/health', function (req, res) {
  res.send({
    status: 'OK'
  });
});

if (process.env.NODE_ENV === 'production') {
  https.createServer(options, app).listen(443);
  https.globalAgent.keepAlive = true;
  console.log('HTTPS Server listening on %s:%s', 'HOST', 443);
} else {
  http.createServer(app).listen(8080);
  http.globalAgent.keepAlive = true;
  console.log('HTTPS Server listening on %s:%s', 'HOST', 8080);
}