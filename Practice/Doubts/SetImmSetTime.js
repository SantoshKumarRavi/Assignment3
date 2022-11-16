// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile("text2.txt", () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});

setTimeout(() => {
    console.log('out timeout');
  }, 0);
  setImmediate(() => {
    console.log('out immediate');
  });

  console.log(process.cwd());