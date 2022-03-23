const developmentConfig = require('./webpack.development');
const productionConfig = require('./webpack.production');
const commonConfig = require('./webpack.common');

module.exports = {
    developmentConfig:developmentConfig,
    productionConfig:productionConfig,
    commonConfig:commonConfig
}