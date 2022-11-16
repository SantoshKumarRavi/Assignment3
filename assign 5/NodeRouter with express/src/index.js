var http = require("http");

const httpServer = http.createServer(handleServer);

function handleServer(req, response) {
  const url = req.url;
  const method=req.method
//   console.log(url);
if (url === '/welcome' && method === 'GET') {
    response.on('error', (err) => {
        console.error(err);
      });
    // response.statusCode = 404; // Tell the client that the resource wasn't found.
      response.statusCode = 404;
      response.setHeader('Content-Type', 'text/plain');
    // response.writeHead(404, {'Content-Type': 'text/plain'})

      // Note: the 2 lines above could be replaced with this next one:
      // response.writeHead(200, {'Content-Type': 'application/json'})
        
      response.write(" Welcome to Dominos!");
      response.end();

}else if (url === '/contact' && method === 'GET') {
    response.on('error', (err) => {
        console.error(err);
      });
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.write(JSON.stringify({  
                  phone: '18602100000', 
                  email: 'guestcaredominos@jublfood.com' 
          }
       ));
      response.end();
} 
else{
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found");
    response.end();
}
// const requestListener = function (req, res) {
//   res.writeHead(200);
//   res.end('Hello, World!');
}

// const server = http.createServer(requestListener);
httpServer.listen(8081);

module.exports = httpServer;
