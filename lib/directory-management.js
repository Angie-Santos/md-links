/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
const fs = require('fs');
const pathNode = require('path');

function isMd(path) {
  const mdFiles = [];
  const ext = pathNode.extname(path);
  if (ext === '.md') {
    mdFiles.push(path);
  } else {
    return 'File isn`t md';
  }
  return mdFiles;
}

function directoryManagement(path) {
  let mdFiles = [];
  const dir = fs.readdirSync(path);
  dir.forEach((doc) => {
    const newPath = `${path}/${doc}`;
    const docPath = fs.statSync(newPath);
    if (docPath.isDirectory()) {
      mdFiles = mdFiles.concat(directoryManagement(newPath));
    } else {
      const ext = pathNode.extname(newPath);
      if (ext === '.md') {
        mdFiles.push(newPath);
      }
    }
  });
  return mdFiles;
}

module.exports = {
  isMd, directoryManagement,
};
