var http = require('http')
  , fs = require('fs')
  , path = require('path')
  , url = require('url');

var mimetypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.kot': 'text/vnd.knockout-template',
  '.kod': 'text/vnd.knockout-data'
}

var server = http.createServer(function(req, res) {
  var rawurl = path.join('.', req.url);
  var parsed = url.parse(rawurl).pathname;
  fs.readFile(parsed, 'utf-8', function(err, data) {
    code = 200;
    if(err) {
      code = 404;
      data = null;
    }
    var extname = path.extname(rawurl);
    res.writeHead(code, {'Content-Type': mimetypes[extname] || 'text/html'});
    res.end(data);
  });
});

console.log('Listening on port 8080');
server.listen(8080);
