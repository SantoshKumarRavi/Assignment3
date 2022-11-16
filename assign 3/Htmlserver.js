let fs=require("fs/promises")
fs.writeFile("index.html",`<h1> Hello World </h1>
<p> This is Santhosh... </p>`,{encoding:"utf8"})


const myFileReader = async (fileName) => {
    let result= await fs
       .readFile(fileName, (err, data) => {
         if (err) {
           console.log("err ", err);
         }
       })
      return result
   }

var http = require('http');
let server=http.createServer(function (req, res) {
     myFileReader(__dirname+"/index.html").then(data=>{
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(data);
    })
})
server.listen(8080,() => {
    console.log(`Server is running on http://localHost:8080`);
});

