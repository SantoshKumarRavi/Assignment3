const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mario = require('./models/marioChar');
const mongoose = require('mongoose');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.post("/mario",(req,res)=>{
    const {marioModel,modelName}=req.body
    const {name,weight}=marioModel
    let regex1=new RegExp(/[0-9]/g)
    let nameStr=(`${name}`)
    if(regex1.test(nameStr)){
        res.status(401).json({error:"it should not be numeric"});
        return
    }
    let weightStr=`${weight}`
    let regex2=new RegExp(/[a-zA-Z]/g)
    if(regex2.test(weightStr)){
        res.status(401).json({error:"it should not be alpha values"});
        return
    }

      
var newModel = new mario(req.body)
  
newModel.save(function(err,result){
    if (err){
        console.log(err);
    }
    else{
        console.log(result)
        res.status(200).json({data:req.body});
    }
})
})
//update
app.put("/mario/:id",(req,res)=>{
const {id}=req.params
// console.log(id)
var objectId = mongoose.Types.ObjectId(id);
mario.findOneAndUpdate({_id:objectId},req.body, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    res.status(200).json({message:"Succesfully updated",data:req.body});
});
})

//delete
app.delete("/mario/:id",(req,res)=>{
    const {id}=req.params
    var objectId = mongoose.Types.ObjectId(id);
    mario.findOneAndDelete({_id:objectId}, function (err, docs) {
        if (err){
            console.log(err)
            res.status(401).json({error:"not a valid id"});
        }
        else{
            if(!docs){
                res.status(401).json({error:"no id match"});
                return
            }else{
                res.status(200).json({message:"Succesfully deleted"});
            }
        }
    });
    })

//get by id

app.get("/mario/:id",(req,res)=>{
    const {id}=req.params
    var objectId = mongoose.Types.ObjectId(id);
    mario.findOne({_id:objectId},function (err, data) {
        if (err){
            console.log(err)
        }
     if(data){
        // console.log(data)
        res.status(200).json({message:"fetched",model:data});

        // res.send(data)
     }else{
        res.status(401).json({error:"no id match"});
    }
      });
    })

//all  characters
app.get("/mario",(req,res)=>{
    mario.find({},function (err, data) {
        if (err){
            console.log(err)
        }
     if(data){
        res.status(200).json({message:"fetched",model:data});
     }else{
        res.status(401).json({error:"no data found"});
     }
      });
    })



module.exports = app;