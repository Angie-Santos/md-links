/* eslint-disable no-console */
/* eslint-disable consistent-return */
// const fs = require('fs');
const fsPromises = require('fs').promises;

// opción fsPromises

function getLink(file) {
  const firstClean = file.match(/\[.*\]\(https?:\/{2}[\w\-.]+\/?.*\)/g);
  const links = [];
  firstClean.forEach((link) => {
    links.push(link.match(/https?:\/{2}.*?(?=\))/g));
  });
  return links.flat();
}

function readFiles(path) {
  return fsPromises.readFile(path, 'utf-8')
    .then((buffer) => getLink(buffer))
    .catch((err) => err);
}

readFiles('test/docs/dir/dir2/file3.md').then(console.log);

// Opción crear una promesa que envuelva otra

// function readFiles(path) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, 'utf-8', (err, buffer) => {
//       if (err) reject(err);
//       const links = buffer.match(/\[.*\]\(https?:\/\/[\w\-\.]+\/?.*\)/g);
//       // console.log(links);
//       resolve(links);
//     });
//   });
// }
// readFiles('test/docs/dir/dir2/file3.md').then(console.log);

// Opción callbacks

// function readFiles(path, callback) {
//   fs.readFile(path, 'utf-8', (err, buffer) => {
//     if (err) return console.error(err.message);
//     const links = buffer.match(/\[.*\]\(https?:\/\/[\w\-\.]+\/?.*\)/g);
//     // console.log(links);
//     callback(links);
//   });
// }
// console.log(readFiles('test/docs/dir/dir2/file3.md',(links)=>{
//   console.log(links);
// }));
