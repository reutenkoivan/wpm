/* eslint-disable max-depth */
const dependenciesCategories = ['dependencies', 'devDependencies', 'peerDependencies']

const increasePackageVersion = (workspaceStore, { releaseType = 'minor' } = {}) => {
  const rootsList = workspaceStore.roots
  const nameList = Object.keys(workspaceStore.names)

  const nextPackages = Object.entries(workspaceStore.packages).reduce((acc, [key, pack]) => {
    return Object.assign(acc, { [key]: { ...pack } })
  }, {})

  for (const key of rootsList) {
    const pack = nextPackages[key]
    const [major, minor, patch] = pack.version.split('.').map(v => Number(v.trim()))

    if (releaseType === 'patch') {
      pack.version = `${major}.${minor}.${patch + 1}`
    }

    if (releaseType === 'minor') {
      pack.version = `${major}.${minor + 1}.0`
    }

    if (releaseType === 'major') {
      pack.version = `${major + 1}.0.0`
    }
  }

  for (const key of rootsList) {
    const pack = nextPackages[key]

    for (const categoryName of dependenciesCategories) {
      if (pack[categoryName]) {
        for (const packageName of nameList) {
          if (packageName in pack[categoryName]) {
            pack[categoryName][packageName] = nextPackages[key].version
          }
        }
      }
    }
  }

  return {
    ...workspaceStore,
    packages: nextPackages,
  }
}

module.exports = increasePackageVersion
