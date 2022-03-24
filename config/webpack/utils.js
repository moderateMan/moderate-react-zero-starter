const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

const publicUrlOrPath = getPublicUrlOrPath(
    process.env.NODE_ENV === 'development',
    require(resolveApp('package.json')).homepage,
    process.env.PUBLIC_URL
  );

const getStyleLoaders = (cssOptions, preProcessor,isEnvDevelopment) => {
    const loaders = [
        isEnvDevelopment && require.resolve("style-loader"),
        !isEnvDevelopment && {
            loader: MiniCssExtractPlugin.loader,
            // css is located in `static/css`, use '../../' to locate index.html folder
            // in production `paths.publicUrlOrPath` can be a relative path
            options: publicUrlOrPath.startsWith(".")
                ? { publicPath: "../../" }
                : {},
        },
        {
            loader: require.resolve("css-loader"),
            options: cssOptions,
        },
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push(
            {
                loader: require.resolve("resolve-url-loader"),
                options: {
                    sourceMap: isEnvProduction
                        ? shouldUseSourceMap
                        : isEnvDevelopment,
                    root: paths.appSrc,
                },
            },
            {
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: true,
                },
            }
        );
    }
    return loaders;
};

module.exports = {
    getStyleLoaders:getStyleLoaders
}