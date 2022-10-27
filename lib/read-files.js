/* eslint-disable no-console */

const fs = require('fs');

function getLink(file, path) {
  const firstClean = file.match(/\[.*\]\(https?:\/{2}[\w\-.]+\/?.*\)/g);
  const links = [];
  if (firstClean) {
    firstClean.forEach((link) => {
      links.push({
        href: link.match(/https?:\/{2}.*?(?=\))/g).toString(),
        text: link.match(/(?!\[).*(?=\])/g)[0].toString(),
        file: path,
      });
    });
  } else {
    links.push({
      href: 'no links found',
      text: 'no links found',
      file: path,
    });
    return links.flat();
  }
  return links.flat();
}

function readFiles(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, buffer) => {
      if (err) reject(err);
      const links = getLink(buffer, path);
      resolve(links);
    });
  });
}

module.exports = {
  readFiles,
};
