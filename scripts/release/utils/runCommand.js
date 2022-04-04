const { spawn } = require('child_process')
const { signale } = require('signales')

const runCommand = (command, args = [], options = {}) => {
  const settings = Object.assign({
    stdin: 'inherit',
  }, options)

  return new Promise(resolve => {
    if (process.env.DRY_RUN) {
      signale.start(command, args, settings)
      resolve([0, null])

      return
    }

    const proc = spawn(command, args, settings)

    proc.on('exit', (...props) => {
      signale.start(`${command} ${args.join(' ')}`, settings, 'result: ', props)
      resolve(props)
    })
  })
}

module.exports = runCommand
