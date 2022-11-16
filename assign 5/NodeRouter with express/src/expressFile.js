
const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
// const route = require('./routes');

app.use(bodyParser.urlencoded({extended: false}));
// app.use(route);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req, res,next)=>{
    res.status(404).send('<h1> Page not found </h1>');
 });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})