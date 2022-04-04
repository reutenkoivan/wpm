const path = require('path')
const glob = require('glob')

const { removeDir, removeFile } = require('./utils')
const { tsConfigPattern, tsbuildinfoPattern } = require('./constants')

for (const tsConfigPath of glob.sync(tsConfigPattern, { ignore: '**/node_modules/**' })) {
  const { compilerOptions: { outDir } } = require(tsConfigPath)
  const dirpath = path.resolve(path.dirname(tsConfigPath), outDir)

  removeDir(dirpath)
}

for (const tsbuildinfo of glob.sync(tsbuildinfoPattern, { ignore: '**/node_modules/**' })) {
  removeFile(tsbuildinfo)
}
