var express = require('express');
var logger = require('morgan');
const https = require('https');
const fs = require('fs');

var app = express();
var privatePemPath = '/etc/letsencrypt/live/webviz.xyz/privkey.pem'
var certPemPath = '/etc/letsencrypt/live/webviz.xyz/fullchain.pem'
var privateKey = fs.readFileSync(privatePemPath);
var certificate = fs.readFileSync(certPemPath);
const options = {
  key: privateKey,
  cert: certificate
};

app.get('*', (req, res) =>
{
  res.redirect('https://' + req.headers.host + req.url);
});
app.use(function (req, res, next)
{
  const {url, path: routePath} = req;
  console.log('-- time:', Date.now(), 'URL:' + url + 'PATH:' + routePath);
  next();
});

app.use(logger('dev'));
app.use(express.static('../dist/browser'));
console.log('start https listen');
var port = 443;
var server = https.createServer(options, app).listen(port, () =>
{
  console.log('got request');
});

