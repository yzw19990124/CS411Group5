/**
 * CS411 Group5 Project 
 * Author: Yanzheng Wu
 * This is the back end server that receive and request to the Spotify API
 */

/* Load the HTTP library */
var http = require("http");

/* Create an HTTP server to handle responses */
http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Greeting, thanks for using the song recommendation App!");
    response.end();
}).listen(8888);