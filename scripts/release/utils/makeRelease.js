const runCommand = require('./runCommand')

const makeRelease = async (workspaceStore, { scope, registry } = {}) => {
  const commands = workspaceStore.roots.map((rootDir) => {
    const args = ['publish', '--registry', registry, '--access', scope]

    return runCommand('npm', args, { cwd: rootDir })
  })

  return await Promise.all(commands)
}

module.exports = makeRelease
