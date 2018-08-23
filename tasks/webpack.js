
const config  	= require('./config');
var path 		= require('path');
var webpack 	= require("webpack");


import process from 'process'

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')



const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';





let config_webpack = {
	entry: [`./${config.path.src.webpack}`],
	module: {
		rules: [
			{
				test: /.jsx?$/,
				use: {
					loader: 'babel-loader',
				},
				exclude: /node_modules/
			}
		]
	},
	context: path.resolve(__dirname, config.path.dist.js),
	output: {
		path: path.join(__dirname, config.path.dist.js),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		// port: 9000
	},
	plugins: !isDevelopment ? [ new webpack.optimize.UglifyJsPlugin() ] : []
}
function scripts() {

    return new Promise(resolve => webpack(config_webpack, (err, stats) => {

        if (err) console.log('Webpack', err)

        console.log(stats.toString({ /* stats options */ }))

        resolve()
    }))
}

module.exports = { config_webpack, scripts }