const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic :String,// {type:String}
    description:String,// {type:Number} like that
    posted_at:String,
    posted_by:String,
    password:{
        type:String,
        // min:5 // inbuilt.. not using 
    }
})

const Blog = mongooose.model('blog', blogSchema);

module.exports = Blog;
