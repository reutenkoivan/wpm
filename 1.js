// https://www.npmjs.com/package/js-yaml
const path = require('path')
const fs   = require('fs')
const logJson = require('prettyoutput')
const { load } = require('js-yaml')
const { Signales } = require('signales')

const configFilesMap = {
  yaml: 'wpm.config.yml',
}

const configPath = path.resolve(configFilesMap.yaml)

const logger = new Signales({
  scope: 'workspace-package-manager',
})

const config = load(fs.readFileSync(configPath))

logger.debug(configPath.replace(`${process.cwd()}/`, ''), `\n${logJson(config, { maxDepth: 10 })}`)
