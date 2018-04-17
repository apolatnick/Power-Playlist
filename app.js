/*************************************************************************************/
/********* PowerPlaylist2.0 Server, created by Alexander Polatnick (2018) ************/
/*************************************************************************************/

var http = require('http');
var fs = require('fs');
var port = 3000;

//creating a server log
var log = function(entry) {
  fs.appendFileSync('/tmp/powerplaylist.log', new Date().toISOString() + ' - ' + entry + '\n');
};

//not found response
function send404Response(response){
  response.writeHead(404, 'Not Found', {"Context-Type":"text/plain"});
  response.write("Error 404: Page not found!");
  response.end();
}

//Handle user request
//Each if statement within this function handles a specific request to the given
//URL which is specified in request. Each conditional statement writes an appropriate
//response. As we continue to develope this, we will need to set up for many potential
//requests, and be able to respond with different responses other than the one
//200 status response.
function onRequest(request, response){
  console.log("Request made: " + request.url);
  if(request.method == 'GET' && request.url == '/'){
    log('Received request to load home page.');
    response.writeHead(200, 'OK', {"Context-Type":"text/html"});
    //fs.createReadStream('./index.html').pipe(response);
    var html = fs.readFileSync('./index.html');
    response.write(html);
    response.end();
  }
  else if(request.method === 'GET' && request.url === '/guest'){
    log('Received request to load guest page.');
    response.writeHead(200, 'OK', {"Context-Type":"text/html"});
    //fs.createReadStream('./index.html').pipe(response);
    var html = fs.readFileSync('./guest.html');
    response.write(html);
    response.end();
  }
  else if(request.method === 'GET' && request.url === '/setPin'){
    log('Received request to load the set pin page.');
    response.writeHead(200, 'OK', {"Context-Type":"text/html"});
    //fs.createReadStream('./index.html').pipe(response);
    var html = fs.readFileSync('./setPin.html');
    response.write(html);
    response.end();
  }
  else if(request.method === 'GET' && request.url === '/guestPin'){
    log('Received request to load the enter pin page.');
    response.writeHead(200, 'OK', {"Context-Type":"text/html"});
    //fs.createReadStream('./index.html').pipe(response);
    var html = fs.readFileSync('./guestPin.html');
    response.write(html);
    response.end();
  }
  else if(request.method === 'GET' && request.url === '/sharePin'){
    log('Received request to load the share pin page.');
    response.writeHead(200, 'OK', {"Context-Type":"text/html"});
    //fs.createReadStream('./index.html').pipe(response);
    var html = fs.readFileSync('./sharePin.html');
    response.write(html);
    response.end();
  }
  else {
    //if the URL in the request doesn't match the any above, respond with not found
    send404Response(response);
  }
}

//creating the server with the node module
var server = http.createServer(onRequest);
//listening to the port that the server is running on for requests
server.listen(port);
console.log("PowerPlaylist Server Running at port " + port + "...");
