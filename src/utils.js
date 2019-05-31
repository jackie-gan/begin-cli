const path = require('path');

function getRootPath() {
  return path.resolve(__dirname, './..');
}

function getPackageVersion() {
  const version = require(path.join(getRootPath(), 'package.json')).version;
  return version;
}

function logPackageVersion() {
  const msg = `zero-cli version: ${getPackageVersion()}`;
  console.log();
  console.log(msg);
  console.log();
}
exports.logPackageVersion = logPackageVersion;