// https://www.npmjs.com/package/read-yaml-file
const path = require('path')
const parseConfig = require('read-yaml-file').default

const configPath = path.resolve('wpm.config.yml')

parseConfig(configPath).then(config => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(config, null, 2))
})
