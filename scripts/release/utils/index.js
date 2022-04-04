const runCommand = require('./runCommand')
const makeRelease = require('./makeRelease')
const pickSettings = require('./pickSettings')
const updatePackages = require('./updatePackages')
const getWorkspacePackages = require('./getWorkspacePackages')
const increasePackageVersion = require('./increasePackageVersion')

module.exports = {
  runCommand,
  makeRelease,
  pickSettings,
  updatePackages,
  getWorkspacePackages,
  increasePackageVersion,
}
