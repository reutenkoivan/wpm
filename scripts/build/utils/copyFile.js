const fs = require('fs')
const path = require('path')

const { signales } = require('signales')

const copyFile = (from, to) => {
  const dirpath = path.dirname(to)

  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath, { recursive: true })
  }

  signales.scope('copy-file').info(to)
  fs.copyFileSync(from, to)
}

module.exports = copyFile
