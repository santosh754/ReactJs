var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'transpiled.js'
    },
    module: {
        rules: [
            {
                test:/\.jsx?$/,
                loader: 'babel-loader',
                exclude:/node_modules/,
                query: {
                    presets:['es2015','react']
                }
            }
        ]
    }
}