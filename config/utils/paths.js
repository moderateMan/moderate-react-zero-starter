'use strict'

const path = require('path')
const fs = require('fs')
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
)

const buildPath = process.env.BUILD_PATH || 'build'

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx'
]

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  )

  if (extension) {
    return resolveFn(`${filePath}.${extension}`)
  }

  return resolveFn(`${filePath}.js`)
}

// config after eject: we're in ./config/
module.exports = {
  webpackDevClientEntry: require.resolve('react-dev-utils/webpackHotDevClient'),
  reactRefreshOverlayEntry: require.resolve(
    'react-dev-utils/refreshOverlayInterop'
  ),
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp('public'),
  appDocs: resolveApp('src/docs'),
  appHtml: resolveApp('public/tpls/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appCommon: path.resolve('src/common'),
  appStore: path.resolve('src/store'),
  appTsConfig: resolveApp('tsconfig.json'),
  eslintPath: require.resolve('eslint'),
  eslintFormatter: require.resolve('react-dev-utils/eslintFormatter'),
  eslintPluginCache: path.resolve(
    resolveApp('node_modules'),
    '.cache/.eslintcache'
  ),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  appNodeModules: resolveApp('node_modules'),
  publicUrlOrPath
}

module.exports.moduleFileExtensions = moduleFileExtensions
