/* eslint-disable no-console */
const { verifyPath } = require('./verify-path');
const { readFiles } = require('./read-files');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const verify = verifyPath(path);
    const arr = verify.map((paths) => readFiles(paths));
    Promise.all(arr).then((links) => resolve(links.flat()));
  });
}

mdLinks('test').then(console.log);

module.exports = {
  mdLinks,
};
