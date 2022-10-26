/* eslint-disable no-console */
const { verifyPath } = require('./verify-path');
const { readFiles } = require('./read-files');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const verify = verifyPath(path);
    if (verify.length > 0) {
      const arr = verify.map((paths) => readFiles(paths));
      Promise.all(arr).then((links) => resolve(links.flat()));
    } else {
      reject(new Error('path does not exist or is broken'));
    }
  });
}

const pathPrueba = '/home/angie/Laboratoria/md-links/test/docs/file1.md';

mdLinks(pathPrueba)
  .then(console.log)
  .catch((err) => console.log(err.message));

module.exports = {
  mdLinks,
};
