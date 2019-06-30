#! /usr/bin/env node

const program = require('commander');
const Project = require('../src/project');

program
  .option('--name [name]', '项目名称')
  .option('--desc [description]', '项目介绍')
  .parse(process.argv);

const { name, description } = program;
const args = program.args;

const projectName = args[0] || name;

const project = new Project({
  projectName,
  description
});

project.create();