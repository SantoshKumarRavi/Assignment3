const fs = require("fs/promises");

const myFileWriter = async (fileName, fileContent) => {
await fs
    .writeFile(fileName, fileContent, "utf-8", { flag: 'a+' }, (err) => {
      console.log(err);
    })
    // return result;
    .then(myFileReader(fileName));
};

const myFileReader = async (fileName) => {
 let result= await fs
    .readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        console.log("err ", err);
      }
      // if(data){
        console.log(data)
        // return data
      // }
    })
    console.log(result)
    // .then((data) => {
    //   console.log(data);
    // });
};

// got it flag working instead of appending child......flag always comes after content.. not after encoding as in default
const myFileUpdater = async (fileName, fileContent) => {
  await fs.writeFile(fileName, fileContent, {flag:"a+"},"utf-8",(err) => {
      if (err) {
        console.log(err);
        return;
      }
    })
    .then(
      myFileReader(fileName)
    );
};

const myFileDeleter = async (fileName) => {
  await fs.rm(fileName);
};

// //Execute  one by one by Commenting remaining function Call to display the proper Output

// // parameters ===> (filename, content)

// // 1)writing new files and showiung
//  myFileWriter("new66.txt","hello ")


  // // //2) reading values
 myFileReader("list.txt")


  // // //3)updaing and reading the updated values
  // myFileUpdater("new66.txt", "santhos kumar ")


  // // //4)delete Files
  // myFileDeleter("new66.txt")


module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter };
