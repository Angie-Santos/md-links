/* eslint-disable no-console */
/* eslint-disable consistent-return */
const fs = require('fs');
const fsPromises = require('fs').promises;

// function readFiles(path) {
//   return fsPromises.readFile(path, 'utf-8');
// }

function readFiles(path) {
  fs.readFile(path, 'utf-8', (err, buffer) => {
    if (err) return console.error(err.message);
    const links = buffer.match(/\[.*\]\(https?:\/\/[\w\-\.]+\/?.*\)/g);
    // console.log(links);
    return links;
  });
}

console.log(readFiles('test/docs/dir/dir2/file3.md'));
