var express = require('express');
var logger = require('morgan');
var app = express();
app.use(function(req,res,next) {
  const { url,path:routePath } = req;
  console.log('-- time:',Date.now(), 'URL:'+url + 'PATH:' + routePath);
  next();
});

app.use(logger('dev'));
app.use(express.static('../dist/browser'));

app.listen(80,()=> {
  console.log('listening now');
})

