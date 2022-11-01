const fs = require('fs');
const pathNode = require('path');
const { directoryManagement, isMd } = require('./directory-management');

function normalizePath(path) {
  return pathNode.resolve(path);
}

function verifyPath(path) {
  try {
    const stats = fs.statSync(path);
    const absPath = normalizePath(path);
    return stats.isFile() ? isMd(absPath) : directoryManagement(absPath);
  } catch (err) {
    return false;
  }
}

module.exports = {
  verifyPath, normalizePath,
};
