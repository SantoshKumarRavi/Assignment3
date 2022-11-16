const mongoose = require('mongoose');
const student = new mongoose.Schema({
    name: String,
    currentClass:String,
    division:String
  });

const Student = mongoose.model('Student', student);
module.exports=Student