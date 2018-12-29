const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    
    return {
        entry: "./src/index.tsx",
        output: {
            filename: devMode ? "[name].js" : "[name].[chunkhash].js",
            path: __dirname + "/dist"
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
        },

        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: devMode ? "[name].css" : "[name].[hash].css",
                chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
            }),

            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/index.html",
                inject: false
            })
        ],

        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader"
                },

                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                },

                {
                    test: /\.scss$/,
                    use: [
                        { loader:  MiniCssExtractPlugin.loader },
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                modules: true,
                                namedExport: true,
                                camelCase: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                modules: true
                            }
                        }
                    ]
                }
            ]
        }
    }
};
