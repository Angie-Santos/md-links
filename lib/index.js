/* eslint-disable no-console */
const { verifyPath } = require('./verify-path');
const { readFiles } = require('./read-files');
const { httpRequest } = require('./http-request');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const verify = verifyPath(path);
    if (verify.length > 0) {
      const arr = verify.map((paths) => readFiles(paths));
      if (options && options.validate === true) {
        Promise.all(arr).then((links) => {
          resolve(httpRequest(links.flat()));
        });
      } else if (options && options.validate === false) {
        Promise.all(arr).then((links) => resolve(links.flat()));
      } else if (options) {
        reject(new Error('Option argument is not valid'));
      } else {
        Promise.all(arr).then((links) => resolve(links.flat()));
      }
    } else if (!path) {
      reject(new Error('you did not enter path'));
    } else {
      reject(new Error('path does not exist or is broken'));
    }
  });
}

mdLinks('test')
  .then((links) => {
    console.log(links);
  })
  .catch((err) => console.log(err.message));

module.exports = {
  mdLinks,
};
