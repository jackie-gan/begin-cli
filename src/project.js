const inquirer = require('inquirer');
const fse = require('fs-extra');
const download = require('download-git-repo');
const { TEMPLATE_GIT_REPO } = require('./constants');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');

function Project(options) {
  this.config = Object.assign({
    projectName: '',
    description: ''
  }, options);
}

Project.prototype.create = function() {
  this.inquire()
    .then((answer) => {
      this.config = Object.assign(this.config, answer);
      this.generate();
    });
};

Project.prototype.inquire = function() {
  const prompts = [];
  const { projectName, description } = this.config;
  if (typeof projectName !== 'string') {
    prompts.push({
      type: 'input',
      name: 'projectName',
      message: '请输入项目名：',
      validate(input) {
        if (!input) {
          return '项目名不能为空';
        }
        if (fse.existsSync(input)) {
          return '当前目录已存在同名项目，请更换项目名';
        }
        return true;
      }
    });    
  } else if (fse.existsSync(projectName)) {
    prompts.push({
      type: 'input',
      name: 'projectName',
      message: '当前目录已存在同名项目，请更换项目名',
      validate(input) {
        if (!input) {
          return '项目名不能为空';
        }
        if (fse.existsSync(input)) {
          return '当前目录已存在同名项目，请更换项目名';
        }
        return true;
      }
    });
  }

  if (typeof description !== 'string') {
    prompts.push({
      type: 'input',
      name: 'description',
      message: '请输入项目描述'
    });
  }

  return inquirer.prompt(prompts);
};

Project.prototype.generate = function() {
  const { projectName, description } = this.config;
  const projectPath = path.join(process.cwd(), './', projectName);
  const downloadPath = path.join(projectPath, '__download__');

  const downloadSpinner = ora('正在下载模板，请稍等');
  downloadSpinner.start();
  // 下载git repo
  download(TEMPLATE_GIT_REPO, downloadPath, { clone: true }, (err) => {
    if (err) {
      downloadSpinner.fail();
      console.log('下载失败');
      return;
    }

    downloadSpinner.succeed();
    console.log('下载成功');
  });

  // 复制文件

  // 安装依赖
}

module.exports = Project;