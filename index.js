const semver = require('semver');
const { engines } = require('./package.json');

const version = engines.node;
if (!semver.satisfies(process.version, version)) {
  console.log(`\t\tModbus2mqtt requires node version ${version}, you are running ${process.version}!\n`); // eslint-disable-line
}

const Controller = require('./lib/controller');

const controller = new Controller();
controller.start();

const fs = require('fs');
controller.mqtt.on('connect', (url) => {
  fs.writeFile('/var/run/mqtt.' + process.pid, url, () => 0);
});

controller.mqtt.on('disconnect', () => {
  fs.unlink('/var/run/mqtt.' + process.pid, () => 0);
});

const shutdown = () => {
  controller.mqtt.disconnect();
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown);
