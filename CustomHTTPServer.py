PORT = 8080

try:
  from  SimpleHTTPServer import SimpleHTTPRequestHandler
  import SocketServer
  server = SocketServer.TCPServer
except:
  from http.server import HTTPServer, SimpleHTTPRequestHandler
  server = HTTPServer

class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
  extensions_map = {
    'persont': 'text/vnd.borax.person-template',
    'persond': 'text/vnd.borax.person-data',
    'orgt':    'text/vnd.borax.organization-template',
    'orgd':    'text/vnd.borax.organization-data',
    '':        'text/html',
  }

print "serving at port", PORT
httpd = server(('127.0.0.1', PORT), CustomHTTPRequestHandler)
httpd.serve_forever()