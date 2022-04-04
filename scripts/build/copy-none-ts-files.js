const path = require('path')
const glob = require('glob')

const { copyFile } = require('./utils')
const { tsConfigPattern } = require('./constants')

for (const tsConfigPath of glob.sync(tsConfigPattern, { ignore: '**/node_modules/**' })) {
  const packageRoot = path.dirname(tsConfigPath)

  const { compilerOptions: { outDir, rootDir } } = require(tsConfigPath)

  for (const file of glob.sync(path.join(packageRoot, rootDir, '**'), { ignore: '**/*.{j,t}s?(x)', nodir: true })) {
    const destination = file.replace(path.resolve(packageRoot, rootDir), path.resolve(packageRoot, outDir))

    copyFile(file, destination)
  }
}
