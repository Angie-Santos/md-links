#!/usr/bin/env node
/* eslint-disable no-console */
const figlet = require('figlet');
const chalk = require('chalk');
const { mdLinks } = require('./index');
const { stats } = require('./stats');

function cli() {
  console.log(chalk.cyanBright(figlet.textSync('MD-LINKS', {
    font: 'ANSI Shadow',
  })));

  const error = chalk.bold.red;

  const [, , ...args] = process.argv;
  if (args.length > 0) {
    if (args.length > 3) {
      console.error(error('There are too many arguments'));
    } else if (args.length === 1) {
      mdLinks(args[0])
        .then((links) => {
          links.forEach((link) => {
            console.log(chalk`{rgb(197, 153, 236).bold ${link.file}} {bold.underline ${link.href}} {rgb(130, 226, 238).bold ${link.text}}`);
          });
        })
        .catch((err) => {
          console.log(error(err.message));
        });
    } else if (((args[1] === '--validate' || args[1] === '--v') && (args[2] === '--stats' || args[2] === '--s')) || ((args[2] === '--validate' || args[2] === '--v') && (args[1] === '--stats' || args[1] === '--s'))) {
      mdLinks(args[0], { validate: true })
        .then((links) => {
          console.log(chalk.bold`{cyan Total: }${stats(links, true).total}`);
          console.log(chalk.bold`{magenta Unique: }${stats(links, true).unique}`);
          console.log(chalk.bold`{rgb(130, 238, 183) Broken: }${stats(links, true).broken}`);
        })
        .catch((err) => {
          console.log(error(err.message));
        });
    } else if (args.length === 2 && (args[1] === '--stats' || args[1] === '--s')) {
      mdLinks(args[0])
        .then((links) => {
          console.log(chalk.bold`{cyan Total: }${stats(links).total}`);
          console.log(chalk.bold`{magenta Unique: }${stats(links).unique}`);
        })
        .catch((err) => {
          console.log(error(err.message));
        });
    } else if (args.length === 2 && (args[1] === '--validate' || args[1] === '--v')) {
      mdLinks(args[0], { validate: true })
        .then((links) => {
          links.forEach((link) => {
            console.log(chalk`{rgb(197, 153, 236).bold ${link.file}} {bold.underline ${link.href}} {white.bold.inverse ${link.ok} ${link.status}} {rgb(130, 226, 238).bold ${link.text}}`);
          });
        })
        .catch((err) => {
          console.log(error(err.message));
        });
    } else {
      console.error(error('Some argument is incorrect, try with --validate, --v, --stats or --s'));
    }
  } else {
    console.error(error('Expected at least one argument'));
  }
}

cli();

module.exports = {
  cli,
};
