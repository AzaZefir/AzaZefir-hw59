const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const {
//     CleanWebpackPlugin
// } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { sources } = require('webpack');

const isDev = process.env.NODE_ENV === 'development'



module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    // devtool: 'source-map',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devServer: {
        port: 9000,
        hot: isDev,
        open: true,
        static: {
            directory: path.join(__dirname, './dist'),
        },
    },
    entry: './script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean:true
    },
    resolve: {
        extensions: ['.js', '.json', '.png']
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        // new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, './src/img/favicon.ico'),
                to: path.resolve(__dirname, './dist')
            }],
            options: {
                concurrency: 100,
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CssMinimizerPlugin(),
        new TerserWebpackPlugin()
    ],
    module: {
        rules: [{
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/i,
                use: ['html-loader']
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/i,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },

                }],

            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
        ]
    }


};