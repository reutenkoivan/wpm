const fs = require('fs')
const { signales } = require('signales')

const removeDir = (dirpath) => {
  if (fs.existsSync(dirpath)) {
    signales.scope('removing-dir').info(dirpath)
    fs.rmdirSync(dirpath, { recursive: true })
  }
}

module.exports = removeDir
