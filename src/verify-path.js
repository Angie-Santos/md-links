/* eslint-disable no-console */
const fs = require('fs');
const pathNode = require('path');

function normalizePath(path) {
  return pathNode.resolve(path);
}

function verifyPath(path) {
  try {
    const stats = fs.statSync(path);
    return stats.isFile() ? 'file' : 'directory';
  } catch (err) {
    // console.error('path does not exist or is broken');
    return false;
  }
}

console.log(verifyPath('test'));

module.exports = {
  verifyPath, normalizePath,
};
