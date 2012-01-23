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
    'kot': 'text/vnd.knockout-template',
    'kod': 'text/vnd.knockout-data',
    '':    'text/html',
  }

print "serving at port", PORT
httpd = server(('127.0.0.1', PORT), CustomHTTPRequestHandler)
httpd.serve_forever()