const { signale } = require('signales')

const { getWorkspacePackages, makeRelease, pickSettings } = require('./utils')
const { pathMap } = require('./constants')

const settings = pickSettings()

Promise.resolve(pathMap)
  .then(getWorkspacePackages)
  .then(newVersionsWorkspaceStore => {
    return makeRelease(newVersionsWorkspaceStore, {
      scope: settings.options.scope,
      registry: settings.options.registry,
    })
  })
  .then(commandResults => {
    signale.debug(commandResults)
    process.exit(0)
  })
  .catch(error => {
    signale.error(error)
    process.exit(1)
  })
