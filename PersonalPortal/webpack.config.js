'use strict';

let webpack = require('webpack');
let path = require('path');

const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./App/";

module.exports = {
    entry: [
        'babel-polyfill',
        srcFolder + "index.jsx" 
    ], 
    devtool: "source-map",
    output: {
		filename: "bundle.js",
		publicPath: 'assets/',
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
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
    ]
};