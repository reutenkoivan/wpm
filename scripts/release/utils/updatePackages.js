const fs = require('fs')
const path = require('path')
const { Signale } = require('signales')

const logger = new Signale({
  scope: 'updatePackages',
  disabled: !process.argv.includes('--debug'),
})

const updatePackages = (workspaceStore, { indent } = {}) => {
  for (const rootPath of workspaceStore.roots) {
    const packagePath = path.join(rootPath, 'package.json')
    const content = JSON.stringify(workspaceStore.packages[rootPath], null, indent)

    logger.debug('Updating ', packagePath)
    fs.writeFileSync(packagePath, `${content}\n`)
  }

  return workspaceStore
}

module.exports = updatePackages
