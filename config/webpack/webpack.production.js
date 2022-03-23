const path = require('path');

module.exports = {
    mode: "production",
    output:{
        path: path.resolve('dist'),
        filename: "static/js/[name].[contenthash:8].js"
    },
}

