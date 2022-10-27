/* eslint-disable no-console */
const { verifyPath } = require('./verify-path');
const { readFiles } = require('./read-files');
const { httpRequest } = require('./http-request');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const verify = verifyPath(path);
    if (verify.length > 0) {
      const arr = verify.map((paths) => readFiles(paths));
      console.log(options);
      if (options) {
        Promise.all(arr).then((links) => {
          resolve(httpRequest(links.flat()));
        });
      } else {
        Promise.all(arr).then((links) => resolve(links.flat()));
      }
    } else {
      reject(new Error('path does not exist or is broken'));
    }
  });
}

mdLinks('test', { validate: true })
  .then(console.log)
  .catch((err) => console.log(err.message));

module.exports = {
  mdLinks,
};
