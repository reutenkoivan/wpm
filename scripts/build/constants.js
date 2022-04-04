const path = require('path')

const tsConfigPattern = path.resolve('packages', '**', 'tsconfig.json')
const tsbuildinfoPattern = path.resolve('packages', '**', 'tsconfig.tsbuildinfo')

module.exports = {
  tsConfigPattern,
  tsbuildinfoPattern,
}
