#! /usr/bin/env node

const program = require('commander');
const { logPackageVersion } = require('../src/utils');

logPackageVersion();

program
  .usage('<command> [options]')
  .command('init [name]', 'init a project')
  .parse(process.argv);