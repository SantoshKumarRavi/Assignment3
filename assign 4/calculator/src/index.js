const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());
let underFlowCondition=-1000000
let overFlowCondition=1000000
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
app.get("/",(req,res)=>{
    res.send("hello")
})


function commonCondition(req,res,total,number1,number2){
    let num1=Number(number1)
    let num2=Number(number2)
    let condition=false;
    let num1StrMatch=number1.match(/[a-z,A-Z]+/g)
    let num2StrMatch=number2.match(/[a-z,A-Z]+/g)
    // console.log(num1StrMatch,num2StrMatch);
    // console.log("NAN num1",!num1,num1===NaN,"num2=====>",!num2,num2===NaN)
    if((num1StrMatch)||(num2StrMatch)){
        // console.log((!num1 || !num2) ,(!((num1==0) && (num2==0))&&!(!((num1==0)&&(num2!=0))||!((num1!=0)&&(num2==0)))));
        const jsonContent = JSON.stringify({ status: "failure",
        message: "Invalid data types", 
        sum:null });
        condition=true;
        res.send(jsonContent)
    }
    else if(total<underFlowCondition || num1<underFlowCondition || num2 <underFlowCondition){
        const jsonContent = JSON.stringify({ status: "failure",
        message: "Underflow", 
        sum:null });
        condition=true;
        res.send(jsonContent)
    }else if(total>overFlowCondition || num1>overFlowCondition || num2 >overFlowCondition){
        const jsonContent = JSON.stringify({ status: "failure",
        message: "Overflow", 
        sum:null });
        condition=true;
        res.send(jsonContent)
    }
    return condition
}

app.post("/add",(req,res)=>{
    let num1=(req.body.num1)
    let num2=(req.body.num2)
    let total=Number(num1)+Number(num2)
    let check=commonCondition(req,res,total,num1,num2)
    // let NANChecking=((!num1 || !num2) ,(!((num1==0) && (num2==0))&&!(!((num1==0)&&(num2!=0))||!((num1!=0)&&(num2==0)))));
    // console.log((!num1 || !num2) ,"sec==> ",(!((num1==0) && (num2==0))&&!(!((num1==0)&&(num2!=0))||!((num1!=0)&&(num2==0))))
    if(!check){
        const jsonContent = JSON.stringify({ status: "success",
        message: "the sum of given two numbers", 
        sum:total });
        res.send(jsonContent)
    }
}
)


app.post("/sub",(req,res)=>{
    let num1=(req.body.num1)
    let num2=(req.body.num2)
    let total=Number(num1)-Number(num2)
    let check=commonCondition(req,res,total,num1,num2)
    if(!check){
        const jsonContent = JSON.stringify({ status: "success",
        message: "the sum of given two numbers", 
        sum:total });
        res.send(jsonContent)
    }
})
app.post("/multiply",(req,res)=>{
    let num1=(req.body.num1)
    let num2=(req.body.num2)
    let total=Number(num1)*Number(num2)
    let check=commonCondition(req,res,total,num1,num2)
    if(!check){
        const jsonContent = JSON.stringify({ status: "success",
        message: "the sum of given two numbers", 
        sum:total });
        res.send(jsonContent)
    }
})
app.post("/divide",(req,res)=>{
    let num1=(req.body.num1)
    let num2=(req.body.num2)
    let total=Number(num1)/Number(num2)
    // console.log("total " ,total,num1,num2)
    if(parseInt(num2)==0 && !!Number(num1) && !(Number(num1)==0 && Number(num2)==0)){
        // console.log((Number(num1)==0 && Number(num2)==0))
        const jsonContent = JSON.stringify({ status: "success",
        message: "Cannot divide by zero", 
        sum:null });
        res.send(jsonContent)
    }else if(!commonCondition(req,res,total,num1,num2)){
        if(!total && total!=0){
            const jsonContent = JSON.stringify({ status: "success",
            message: "the sum of given two numbers", 
            sum:"Undefined" });
            res.send(jsonContent)
        }else{
            const jsonContent = JSON.stringify({ status: "success",
            message: "the sum of given two numbers", 
            sum:total });
            res.send(jsonContent)
        }
      
    }
 
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;