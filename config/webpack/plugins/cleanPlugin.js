const fs = require('fs-extra')

class CleanPlugin {
  apply(compiler) {
    const outputPath = compiler.options.output.path
    compiler.hooks.afterEnvironment.tap('CleanPlugin', stats => {
      fs.emptyDirSync(outputPath)
    })
  }
}

module.exports = CleanPlugin
