const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/mongoose");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
let studentArray = require("./InitialData");

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

async function main() {
  await mongoose.connect("mongodb://localhost:27017/StudentsDetails",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
      console.log("db connected");
    });
}
main().catch((err) => console.log(err));

app.get("/api/student", (req, res) => {
  // if()
  res.send(JSON.stringify(studentArray));
});
app.get("/api/student/:id",async (req, res) => {
  let ids = (req.params.id)
  // console.log(typeof(ids))
  let filtered = studentArray.filter((e) => Number(e.id) == Number(ids));
  filtered.length!=0 ? res.send(JSON.stringify(filtered)):res.send(200,JSON.stringify(data))
    let hex = /[0-9A-Fa-f]{24}/g;
    let formatedObjectid;
    let data=null
    if(hex.test(ids)){
      console.log("changred to obj")
       formatedObjectid =mongoose.Types.ObjectId(ids)
        data=await Student.findOne({_id:formatedObjectid},function (err,data) {
        if(err){
          console.log("error")
        }else{
          console.log(" get res data",(data))
          return data
        }
      }).clone().then(()=>{
        console.log('loaded finished')
      })
    }else{
      console.log("not changred to obj")
       formatedObjectid =ids
    }
  // console.log("before ",data)
  if (filtered.length == 0 && !data ){////|| data&&Object.keys(data).length==0 )
    res.send(400, "Invalid Id");
  } else {
    // console.log("after ", data)
  }

});

app.put("/api/student/:id", async(req, res) => {
  const ids = req.params.id;
  // console.log(id)
  // const filter = {id};
  const update=req.body

  console.log("updated",update)
  let hex = /[0-9A-Fa-f]{24}/g;

  if(hex.test(ids)){
  // let studentid = mongoose.Types.ObjectId(`${ids}`);
  // console.log("studentid ",studentid)
  await Student.findOneAndUpdate({_id: mongoose.Types.ObjectId(ids)}, update,{upsert: true}).then(()=>{
    res.send({status:"sucess",message:"updated"})
  })
  }else{
    let filtered = studentArray.filter((e) => Number(e.id) == Number(ids));
    console.log("filerted ",filtered.length)
    if(filtered.length!=0){
      studentArray=studentArray.map((ele,i)=>{
        // console.log(i+1 +"ele id=========>" +ele.id,"ids====>",ids,"condition ==>", Number(ele.id) == Number(ids))
        if( Number(ele.id) == Number(ids)){
          return {...update,"id":Number(ids)}
        }else{
          return ele
        }
      })
      console.log("updated ",studentArray)
    }else{
      res.send({status:"failure",message:"please provide correct details"})
    }


  }

});


app.delete("/api/student/:id", async(req, res) => {
  const ids = req.params.id;
  // console.log(id)
  // let studentid = mongoose.Types.ObjectId(`${ids}`);
  let hex = /[0-9A-Fa-f]{24}/g;

  if(hex.test(ids)){
    console.log("delete req received studentid ")
    await Student.deleteOne({_id: mongoose.Types.ObjectId(ids)},function(err){
      if(err){
        console.log("error deleting" ,err)
      }
    }).clone().then(()=>{
      res.send({status:"sucess",message:"deleted"})
    })
  }else{
    res.send({status:"failure",message:"please provide correct details"})
  }
  
});

app.post("/api/student", async (request, res) => {
  console.log("post request recieved");
  // const id=req.params.id
  const reqContent = request.body;
  // console.log(Student());
  // console.log(reqContent);
  // const studentDetails = new Student(reqContent) ;
  Student(reqContent).save(function (err,result) {
    if (err) return handleError(err);
    if(result){
        // console.log("stu details saved",result)
        // console.log(studentDetails)
        res.send(200, JSON.stringify({ id:result._id,message:"sucessfully created" }));
    };
  });
  // const person = await Student.find();
  // console.log(person)
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
