const app = require('./app');
const dotenv = require('dotenv');

const mongoose = require('mongoose');
// const Blog = require("../src/models/Blog") //scehema 


dotenv.config();

//connect to DB
// mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log('connected to DB')
// })

mongoose.connect('mongodb://localhost:27017/blogs',()=>{
    console.log("connected to db")
});

//"mongodb://localhost/blogs"


// console.log(app)
// console.log(mongoose.connection)
app.listen(8081, () => console.log('Server running......'));

