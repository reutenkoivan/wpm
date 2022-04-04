const fs = require('fs')
const { signales } = require('signales')

const removeFile = (filepath) => {
  if (fs.existsSync(filepath)) {
    signales.scope('removing-file').info(filepath)
    fs.unlinkSync(filepath)
  }
}

module.exports = removeFile
