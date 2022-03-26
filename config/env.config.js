const isEnvDevelopment = process.env.NODE_ENV === 'development'
const path = require('path')
let envPath = path.resolve(
  __dirname,
  isEnvDevelopment ? './env/.env.development' : './env/.env.production'
)
require('dotenv').config({
  path: envPath
})

console.log(process.env.test)
