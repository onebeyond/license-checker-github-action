const core = require('@actions/core')
// const wait = require('./wait')
// const execSync = require('child_process').execSync
const existSync = require('fs').existsSync
const { scan } = require('@onebeyond/license-checker/src/runner')

// most @actions toolkit packages have async methods
async function run () {
  try {
    if (!existSync('./package.json')) {
      throw new Error('package.json not found')
    }

    const failOn = core.getInput('failOn')
    if (!failOn) {
      throw new Error('failOn is required')
    }

    core.info(`Checking if any of these licenses are found using the @onebeyond/license-checker package: ${failOn} ...`)
    // execSync(`npx @onebeyond/license-checker --failOn ${failOn} -y`)
    await scan({ failOn });
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
