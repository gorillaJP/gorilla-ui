import express from 'express';
import logger from './logger';
//import cors from 'cors';
import bodyParser from 'body-parser';
const { createProxyMiddleware } = require('http-proxy-middleware');
//import compression from 'compression';

const fs = require('fs');
var http = require('http');
var https = require('https');

const hskey =
    process.env.NODE_ENV === 'production' ? fs.readFileSync('/apps/certs/gorilla.lk/gorilla_lk_key.key', 'utf8') : '';
const hscert =
    process.env.NODE_ENV === 'production' ? fs.readFileSync('/apps/certs/gorilla.lk/gorilla.lk.crt', 'utf8') : '';
const ca =
    process.env.NODE_ENV === 'production' ? fs.readFileSync('/apps/certs/gorilla.lk/gorilla_lk.ca-bundle', 'utf8') : '';

const options = {
    key: hskey,
    cert: hscert,
    ca: ca
};

//create instance
const app = express();
//app.use(cors());
//app.use(compression());
app.use(express.static('build'));
app.use(express.static('/apps/images/gorilla.lk'));

//http to https redirect
app.use((request, response, next) => {
    logger.info('received http :', request.http);

    if (process.env.NODE_ENV != 'development' && !request.secure) {
        return response.redirect('https://' + request.headers.host + request.url);
    }
    next();
});

//enable gzip for prod env
console.log('process.env.NODE_ENV : ' + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    app.get('*.js', function(req, res, next) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', 'text/javascript');
        next();
    });
}

app.disable('etag');

//proxy from UI to service (only active in prod. to avoid CORS)
app.use('/api', createProxyMiddleware({ target: 'https://gorilla.lk:444', changeOrigin: false }));

app.use('/health', (req, res) => {
    res.send({ status: 'OK' });
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
