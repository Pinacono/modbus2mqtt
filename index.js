const semver = require('semver');
const { engines } = require('./package.json');

const version = engines.node;
if (!semver.satisfies(process.version, version)) {
  console.log(`\t\tModbus2mqtt requires node version ${version}, you are running ${process.version}!\n`); // eslint-disable-line
}

const Controller = require('./lib/controller');

const controller = new Controller();
controller.start();

const shutdown = () => {
  fs.unlink('/var/run/mqtt.' + process.pid);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown);
