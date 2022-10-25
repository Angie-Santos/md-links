/* eslint-disable no-console */
/* eslint-disable consistent-return */

const fs = require('fs');
// const fsPromises = require('fs').promises;

// opción fsPromises

function getLink(file) {
  const firstClean = file.match(/\[.*\]\(https?:\/{2}[\w\-.]+\/?.*\)/g);
  const links = [];
  if (firstClean) {
    firstClean.forEach((link) => {
      links.push(link.match(/https?:\/{2}.*?(?=\))/g));
    });
  } else {
    return 'no contain links';
  }
  return links.flat();
}

// function readFiles(path) {
//   return fsPromises.readFile(path, 'utf-8')
//     .then((buffer) => getLink(buffer))
//     .catch((err) => err);
// }

// readFiles('test/docs/dir/dir2/file3.md').then(console.log);

// Opción crear una promesa que envuelva otra

function readFiles(paths) {
  return new Promise((resolve, reject) => {
    if (paths.length > 0) {
      paths.forEach((path) => {
        fs.readFile(path, 'utf-8', (err, buffer) => {
          if (err) reject(err);
          resolve(path, buffer);
        });
      });
    }
  });
}

readFiles(['test/docs/dir/dir2/file3.md', '/home/angie/Laboratoria/md-links/test/docs/file2.md', '/home/angie/Laboratoria/md-links/test/docs/file1.md']).then((path, buffer) => console.log(path, buffer));

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

module.exports = {
  readFiles,
};
