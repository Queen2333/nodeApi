'use strict';
const webpack = require('webpack');
const RunNodeWebpackPlugin = require('run-node-webpack-plugin')
let externals = _externals();
module.exports = {
    entry: {
        app: './app.js'
    },
    target: 'node',
    mode:'development',
    output: {
        path: __dirname + '/build',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    externals: externals,
    node: {
        // console: true,
        global: true,
        // process: true,
        // Buffer: true,
        __filename: true,
        __dirname: true,
        // setImmediate: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // query: {
                //     presets: ['es2015', 'stage-0']
                // },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new RunNodeWebpackPlugin()
    ]
}
function _externals() {
    let manifest = require('./package.json');
    let dependencies = manifest.dependencies;
    let externals = {};
    for (let p in dependencies) {
        externals[p] = 'commonjs ' + p;
    }
    return externals;
}