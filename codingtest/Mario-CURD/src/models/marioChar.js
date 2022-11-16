const mongoose = require('mongoose');
const Schema=mongoose.Schema
//  Your code goes here

const marioSchema = new Schema({
    marioModel:{name:String,weight:Number},
    modelName:String
});

const mario = mongoose.model('mario', marioSchema);
module.exports = mario;