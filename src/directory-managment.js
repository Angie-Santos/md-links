/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
const fs = require('fs');
const pathNode = require('path');

const mdFiles = [];

function isMd(path) {
  const ext = pathNode.extname(path);
  if (ext === '.md') {
    mdFiles.push(path);
  } else {
    return false;
  }
  return mdFiles;
}

function directoryManagement(path) {
  const dir = fs.readdirSync(path);
  const recursive = dir.length > 0 ? dirOrFile(dir, path) : 'no contain files';
  return mdFiles;
}

function dirOrFile(dir, path) {
  let newPath;
  dir.forEach((doc) => {
    newPath = `${path}/${doc}`;
    const docPath = fs.statSync(newPath);
    const recursive = docPath.isDirectory() ? directoryManagement(newPath) : isMd(newPath);
  });
}

module.exports = {
  isMd, directoryManagement, dirOrFile,
};
