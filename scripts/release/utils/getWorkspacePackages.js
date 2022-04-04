const path = require('path')
const glob = require('glob')
const { Signale } = require('signales')

const logger = new Signale({
  scope: 'getWorkspacePackages',
  disabled: !process.argv.includes('--debug'),
})

const makeWorkspacePatterns = ({ workspaces }) => {
  return workspaces.map(packagePattern => path.resolve(packagePattern, 'package.json'))
}

const getWorkspacePackages = (pathMap) => {
  logger.debug('pathMap: ', pathMap)

  const store = {
    roots: [],
    names: {},
    packages: {},
  }

  const patterns = makeWorkspacePatterns(require(pathMap.root))

  logger.debug('patterns: ', patterns)

  const packages = patterns.reduce((acc, pattern) => {
    const packageList = glob.sync(pattern, { ignore: '**/node_modules/**' })

    return acc.concat(packageList)
  }, [])

  for (const packagePath of packages) {
    const dirName = path.dirname(packagePath)
    const packageContent = require(packagePath)

    store.roots.push(dirName)
    store.names[packageContent.name] = dirName
    store.packages[dirName] = packageContent
  }

  logger.debug('store: ', store)

  return store
}

module.exports = getWorkspacePackages
