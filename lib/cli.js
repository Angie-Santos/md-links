#!/usr/bin/env node
/* eslint-disable no-console */
const { mdLinks } = require('./index');
const { stats } = require('./stats');

function cli() {
  const [, , ...args] = process.argv;
  if (args.length > 0) {
    if (args.length > 3) {
      console.error('There are too many arguments');
    } else if (args.length === 1) {
      mdLinks(args[0])
        .then((links) => {
          links.forEach((link) => {
            console.log(link.file, link.href, link.text);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if ((args[1] === '--validate' && args[2] === '--stats') || (args[2] === '--validate' && args[1] === '--stats')) {
      mdLinks(args[0], { validate: true })
        .then((links) => {
          console.log('Total: ', stats(links, true).total);
          console.log('Unique: ', stats(links, true).unique);
          console.log('Broken: ', stats(links, true).broken);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (args.length === 2 && args[1] === '--stats') {
      mdLinks(args[0])
        .then((links) => {
          console.log('Total: ', stats(links).total);
          console.log('Unique: ', stats(links).unique);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (args.length === 2 && args[1] === '--validate') {
      mdLinks(args[0], { validate: true })
        .then((links) => {
          links.forEach((link) => {
            console.log(link.file, link.href, link.ok, link.status, link.text);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.error('some argument is incorrect');
    }
  } else {
    console.error('Expected at least one argument');
  }
}

cli();
