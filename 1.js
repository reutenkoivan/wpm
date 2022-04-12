// https://www.npmjs.com/package/read-yaml-file
const path = require('path')
const { Signales } = require('signales')
const parseConfig = require('read-yaml-file').default

const configPath = path.resolve('wpm.config.yml')

const logger = new Signales({
  scope: 'wpm',
})

parseConfig(configPath)
  .then(config => {
    // eslint-disable-next-line no-console
    logger.debug(JSON.stringify(config, null, 2))
  })
  .catch(e => {
    logger.error(`${e.reason.trim()}!\n\n`, e.mark.snippet.trim())
  })
