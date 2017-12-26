'use strict';

let webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
let path = require('path');

const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./App/"

module.exports = {
    entry: {
        blog: srcFolder + "Blog/blog.jsx"
    },
    devtool: "source-map",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["env", "react"]
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|gif|png)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new CommonsChunkPlugin("common")
    ]
};