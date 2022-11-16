import React, { useState } from 'react'

const Home = () => {
const [state,setState]=useState({
    name:"",
    currentClass:"",
    division:"",
    message:"",
    id:""
})
const initialState={
  name:"",
  currentClass:"",
  division:"",
  message:"",
  id:""
}
function updateState(e){
    // console.log(e)
    setState((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    })
}
function postsubmit(e){
  e.preventDefault();
  let checkingAllReceived=new URLSearchParams(new FormData(e.target))
  let count=0
  checkingAllReceived.forEach((ele)=>{
    if(ele.length!==0){
      count++
    }
  })
  if (count !== 3) {
    setState((prev) => {
      return { ...prev, message: "provide all values" };
    });
  } else {
    (async function postingCall() {
      await fetch("http://localhost:8080/api/student", {
        method: "post",
        body: new URLSearchParams(new FormData(e.target)), // e.target is the form
        headers:{
        "content-type":"application/x-www-form-urlencoded"
        }
      })
        .then((res) => {
          // console.log(res)
          return res.json();
        })
        .then((response) => {
          console.log("res log",response)
          const {id,message}=response
          setState((prev) => {
            return { ...prev, message: `${message} with ${id}` };
          });
          console.log("got from serber to this url");
        });
    })();
    setState(()=>initialState)
  }
  
  

}

function updateRecord(){
  if(name && currentClass && division){
    (async function postingCall() {
      await fetch(`http://localhost:8080/api/student/${id}`, {
        method: "put",
        body: JSON.stringify({ name:name,
        currentClass:currentClass,
        division:division}), // e.target is the form
        headers:{
        "content-type":"application/json"
        }
      })
        .then((res) => {
          // console.log(res)
          return res.json();
        })
        .then((res) => {
          const {status,message}=res
          setState((prev) => {
            return { ...prev, message: `${status} ${message}` };
          });
          console.log("updated to server");
        });
    })();
    setState(()=>initialState)
  }else{
    setState((prev) => {
      return { ...prev, message: "provide all values to update" };
    });
  }
 
}
function deleteRecord(){
  // {console.log("deleting req")}
  if(id){
    (async function deletingCall() {
      await fetch(`http://localhost:8080/api/student/${id}`, {
        method: "delete", // e.target is the form
      })
        .then((res) => {
          // console.log(res)
          return res.json();
        })
        .then((res) => {
          const {status,message}=res
          setState((prev) => {
            return { ...prev, message: `${status} ${message}` };
          });
          console.log("deleted to server");
        });
    })();
    setState(()=>initialState)
  }else{
    setState((prev) => {
      return { ...prev, message: "provide id to delete" };
    });
  }
 
}


const {name,currentClass,division,message,id}=state
  return (<>
      <form onSubmit={(e)=>postsubmit(e)}>
        <input type="text" name="name" value={name} onChange={(e)=>updateState(e)} placeholder="Enter Name"/>
        <input type="text" name="currentClass" value={currentClass} onChange={(e)=>updateState(e)} placeholder="Enter currentClass"/>
        <input type="text" name="division" value={division} onChange={(e)=>updateState(e)} placeholder="Enter division"/>
        <input type="submit" value={"Button"}/>
        <p name="message">{message}</p>
      </form>
      <input type="text" name="id" value={id} onChange={(e)=>updateState(e)} placeholder="Enter id to update or delete"/>
      <button onClick={()=>updateRecord()} >Update</button>
      <button onClick={()=>deleteRecord()}>Delete</button>
      </>

  )
}

export default Home