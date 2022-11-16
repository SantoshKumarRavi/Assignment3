// defines in the object protityper
function JoinString(){
return Object.defineProperties(String.prototype, {
  my: {
    get: function () {
      //it stores string value that is calling functions
      const thisString = this;

                return function (array) {
                  return (thisString.toString()+" "+array.join(" "));
                  }
                  //use get if you want to return a value without parenthesis ()
                  // get len() {
                    // return thisString.length;
                  // },
                      
                
    },
  },
});
}

JoinString()
let cArray=["san","thosh"]
console.log("hii".my(cArray))

//make in the string prototype
// let str="lower"
// String.prototype.makeCaps = function () {
//   let newString=this
//   newString=newString.split("")
//   newString[0]=newString[0].toUpperCase()
//   return newString.join("");
// };
// console.log("try makkle".makeCaps())

module.exports=JoinString