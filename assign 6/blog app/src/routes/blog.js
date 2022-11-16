const router = require('express').Router();
const express=require('express')
const Blog = require('../models/Blog')//scehema 
const path = require('path');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));


// Your routing code goes here
router.get('/blog',async (req,res)=>{
let queryCheck=(Object.keys(req.query).length)
if(queryCheck==0){
    return res.sendFile(path.join(__dirname,"../../index.html"))
}else{
    const {page,search}=req.query
    let contentPerPage=5
    let end=contentPerPage*Number(page)
    let start=end-contentPerPage
    // console.log(search)
    // console.log(req.query);
    const filter = {topic:search};
    const data = await Blog.find(filter)
    // console.log(data.length)
    const fileteredData=await data.slice(start,end)
    // console.log(fileteredData)
    res.send(JSON.stringify({data:fileteredData}))
}
})

// validaor
const { body, validationResult } = require('express-validator');

router.post('/blog',
body('password').isLength({ min: 5 }) //checking here
,(req,res)=>{
    //if error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors:"min length of password is 5"});
    }
    let topicDetails=req.body.topic
    let descDetails=req.body.description
    let postedAtDetails=req.body.posted_at
    let postedbyDetails=req.body.posted_by
    // console.log(req.body,postedAtDetails,postedbyDetails);
    res.send(JSON.stringify({status:'added sucfessful'}))
    let mongooseModel= Blog
    var blog1 = new mongooseModel({ topic: topicDetails, description:descDetails, posted_at:postedAtDetails,posted_by:postedbyDetails });
    // save model to database
    blog1.save(function (err, savedobj) {
      if (err) return console.error(err);
      console.log("saved to blogs collection.");
    //   console.log(savedobj);
    });
})
router.put('/blog/:id',async(req,res)=>{
    // console.log(req.body)
    console.log(req.path)
    let pathFinder=req.path
    let id=pathFinder.split("/")[2] //req.params instead of this
    // var  {id}=req.url;
    let topicDetails=req.body.topic
    let descDetails=req.body.description
    let postedAtDetails=req.body.posted_at
    let postedbyDetails=req.body.posted_by
    let query={"_id":id}
    let updatedOne={topic: topicDetails, description:descDetails, posted_at:postedAtDetails,posted_by:postedbyDetails }
    // req.newData.username = req.user.username;
    Blog.findOneAndUpdate(query,updatedOne, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send(JSON.stringify({status:'Succesfully saved.'}));
    });
})

router.delete('/blog/:id',async(req,res)=>{
    // console.log("req is coming")
    // console.log(req.path)
    // let pathFinder=req.path
    // let id=pathFinder.split("/")[2] //req.params instead of this
    const {id}=req.params
    // var  {id}=req.url;
    // let topicDetails=req.body.topic
    // let descDetails=req.body.description
    // let postedAtDetails=req.body.posted_at
    // let postedbyDetails=req.body.posted_by
    // let query={"_id":id}
    // let updatedOne={topic: topicDetails, description:descDetails, posted_at:postedAtDetails,posted_by:postedbyDetails }
    // req.newData.username = req.user.username;
    // Blog.findOneAndUpdate(query,updatedOne, {upsert: true}, function(err, doc) {
    //     if (err) return res.send(500, {error: err});
    //     return res.send(JSON.stringify({status:'Succesfully saved.'}));
    // });
    Blog.findOneAndRemove({_id:id}, function(err){
        console.log(err)
    });
    return res.send(JSON.stringify({status:'Succesfully Deleted.'}));
})

// router.get("/blogs?page=number&search=word",(req,res)=>{
//     // let page = req.query.page;
//     // let limit = req.query.limit;
//     console.log(page, limit)
//     res.send("sucess")

// })
module.exports = router;