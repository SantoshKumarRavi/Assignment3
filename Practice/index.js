const fs=require("fs")
console.log(fs.stat("./index.js",(e,data)=>{
if(e){
  console.log(e);
}
console.log(data);
}))