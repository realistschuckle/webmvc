var http = require('http')
  , fs = require('fs')
  , path = require('path')
  , url = require('url');

var mimetypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.persont': 'text/vnd.borax.person-template',
  '.persond': 'text/vnd.borax.person-data',
  '.orgt':    'text/vnd.borax.organization-template',
  '.orgd':    'text/vnd.borax.organization-data'
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
    var extname = path.extname(url);
    res.writeHead(code, {'Content-Type': mimetypes[extname] || 'text/html'});
    res.end(data);
  });
});

console.log('Listening on port 8080');
server.listen(8080);
