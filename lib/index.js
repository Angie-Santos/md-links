/* eslint-disable no-console */
const { verifyPath } = require('./verify-path');
const { readFiles } = require('./read-files');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const verify = verifyPath(path);
    const links = [];
    readFiles(verify).then(resolve(console.log(links)));
  });
}

console.log(mdLinks('test'));
module.exports = {
  mdLinks,
};
