          ___           ___           ___           ___           ___     
         /\  \         /\  \         /\  \         /\  \         |\__\    
        /::\  \       /::\  \       /::\  \       /::\  \        |:|  |   
       /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/\:\  \       |:|  |   
      /::\~\:\__\   /:/  \:\  \   /::\~\:\  \   /::\~\:\  \      |:|__|__ 
     /:/\:\ \:|__| /:/__/ \:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\ ____/::::\__\
     \:\~\:\/:/  / \:\  \ /:/  / \/_|::\/:/  / \/__\:\/:/  / \::::/~~/~   
      \:\ \::/  /   \:\  /:/  /     |:|::/  /       \::/  /   ~~|:|~~|    
       \:\/:/  /     \:\/:/  /      |:|\/__/        /:/  /      |:|  |    
        \::/__/       \::/  /       |:|  |         /:/  /       |:|  |    
         ~~            \/__/         \|__|         \/__/         \|__|   

A proof of concept for a new (old) way to build web apps, one that mimics
what browsers should do with ``multipart/related`` messages and custom
media types.

## To run this sample

If you have [npm](http://npmjs.org) installed, just type ``npm start``.

## History

Based on a conversation with [philipmat](http://philipm.at/), his blog post
[New (Old) Web App Architecture](http://philipm.at/2012/0121/), and my two
blog posts
[Fielding's REST for R33LZ](http://curtis.schlak.com/2012/01/19/fieldings-rest.html)
and
[HATEOAS: A Follow-Up to Rest for R33lZ for BORAX](http://curtis.schlak.com/2012/01/23/hateoas-a-follow-up-to-rest-for-r33lz.html),
this code describes what I've ironically called BORAX-programming

#To run this sample:

* If you have python installed, execute `python -m SimpleHTTPServer` 
in this root folder, then point your browser to [http://localhost:8000/static/](http://localhost:8000/static/).
With ruby, you can use Rack with [this simple recipe](http://blog.samsonis.me/2010/02/rubys-python-simplehttpserver/). 
* Otherwise, point your web server to this folder. If you would access it via `http://localhost/webmvc/`, 
go and change the `static/config.js` file to read `/webmvc/static` and `/webmvc/data` instead.

To prove the point I made in [my blog post](http://philipm.at/) - 
that you could get the JSON data from another server - you could 
run `python -m SimpleHTTPServer 8000` in `./static` and `python -m SimpleHTTPServer 8001` 
in `./data`, in which case you'll want to edit `./static/config.js` and use 
`/` for `templates_root` and `http://localhost:8001` for `data_root`.
