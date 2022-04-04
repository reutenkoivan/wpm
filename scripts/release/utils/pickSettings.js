const { Signale } = require('signales')

const logger = new Signale({
  scope: 'pickSettings',
  disabled: !process.argv.includes('--debug'),
})

const getReleaseType = (title) => {
  if (title.match(/^feat\(.+\)!:/)) {
    return 'major'
  }

  if (title.match(/^feat\(.+\):/)) {
    return 'minor'
  }

  return 'patch'
}

const flags = {
  start: '<--- RELEASE SETTINGS --->',
  end: '<--- /RELEASE SETTINGS --->',
}

const parseSettings = (description) => {
  try {
    const rows = description.split('\n')
    const startIndex = rows.findIndex(row => row === flags.start)
    const endIndex = rows.findIndex(row => row === flags.end)

    if (startIndex === -1 && endIndex === -1) {
      return {}
    }

    return JSON.parse(rows.slice(startIndex + 1, endIndex).join('\n'))
  } catch (e) {
    logger.error('Release options is not JSON serializable object!')

    return {}
  }
}

const pickSettings = () => {
  const options = Object.assign({
    releaseType: getReleaseType(process.env.PR_TITLE || ''),
    indent: 2,
    scope: 'public',
    registry: 'https://registry.npmjs.org',
  }, parseSettings(process.env.PR_BODY || ''))

  const settings = {
    options,
  }

  logger.info('Settings: ', settings)

  return settings
}

module.exports = pickSettings
