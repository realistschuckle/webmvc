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

__npm__
: If you have [npm](http://npmjs.org) installed, just type ``npm start``.

__node__
: If you have only [node.js](http://nodejs.org) installed without **npm**, what
  are you doing?!?! You have something against **npm**? Fine! Run the sample
  with ``node server.js``.

__python__
: No javascript interpreters on your machine? Fine. Have Python? Try running
  ``python CustomHTTPServer.py``.

__apache__
: No Python? Do you have Apache? If so, you should be ok with the .htaccess file
  here in the root.

__iis__
: You don't even have Apache? How about IIS 7 or better? The web.config file in
  this directory should take care of you.

__else__
: *None of these?* You don't have any of these? Well, look in the .htaccess file
  and add those MIME types to your Web server *du jour*.

Now that you've figured that out, navigate over to
[http://localhost:8080/static/index.html](http://localhost:8080/static/index.html)
and you rock the world!

## History

Based on a conversation with [philipmat](http://philipm.at/), his blog post
[New (Old) Web App Architecture](http://philipm.at/2012/0121/), and my two
blog posts
[Fielding's REST for R33LZ](http://curtis.schlak.com/2012/01/19/fieldings-rest.html)
and
[HATEOAS: A Follow-Up to Rest for R33lZ for BORAX](http://curtis.schlak.com/2012/01/23/hateoas-a-follow-up-to-rest-for-r33lz.html),
this code describes what I've started calling BORAX-programming

This ain't no
[20-Mule Team BORAX](http://video.google.com/videoplay?docid=5782992666427964614).