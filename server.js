// code away!
// implement your API here
const express = require('express'); // built in node.js module to handle http traffic
//const hostname = 'localhost'; // the local computer where the server is running
const port = 5000; // a port we'll use to watch for traffic
const server = express();
server.use(express.json());
//server.use(logger);

var data = [ //some lucky numbers yay
]

//server.use('/', (req, res) => { res.send(`api is up and running <br/>${process.env.MOTD}`)});

 //causes a double run on the server should be outsourced to a different file
/* server.listen(port, () => {
    // start watching for connections on the port specified
    console.log(`Server running at http://localhost:${port}/`);
  }); */
  
server.get("/games",(req,res) => {res.status(200).json({data: data})})

server.post("/games", (req,res) => {
  
  let d = {title: req.body.title, genre: req.body.genre, releaseYear: req.body.releaseYear}
  if(!d.title || d.title === "" || d.title === " " || !d.genre || d.genre === "" || d.genre === " ")
    return res.status(422).send("data is incorrect");
  if(data.filter(x=> x.title === d.title).length > 0 ) return res.status(405).send("titlemust be unique")
  data.push(d);
  return res.status(201).json({data: data});
})

server.delete('/games', (req,res) => {data = []; return res.status(202).send("all data deleted")})

function logger(req,res,next)
{
console.log(`${req.method} is being used at ${req.url} at ${Date.now()}`);
next();
}

module.exports = server;