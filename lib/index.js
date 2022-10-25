/* eslint-disable no-console */
const { verifyPath } = require('./verify-path');
const { readFiles } = require('./read-files');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const verify = verifyPath(path);
    const linksFile = [];
    verify.forEach((paths) => {
      linksFile.push(readFiles(paths).then((links) => resolve(links)));
    });
  });
}
mdLinks('test').then(console.log);

module.exports = {
  mdLinks,
};
