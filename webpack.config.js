require("babel-polyfill");
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	entry: [
		"babel-polyfill",
		"./src/index.js",
		"tether",
		"font-awesome/scss/font-awesome.scss",
	],
	target: "web",
	devtool: '',
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty"
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundled.js',
		publicPath: '/'
	},
	externals: [
		require('webpack-require-http').custom({
			rules: {
				'snap': 'https://app.sandbox.midtrans.com/snap/snap.js'
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader"
					}
				]
			},
			{
				test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'url-loader?limit=10000',
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: 'file-loader',
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'file-loader?name=images/[name].[ext]',
					'image-webpack-loader?bypassOnDebug'
				]
			},
			{
				test: /\.(scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader', // translates CSS into CommonJS modules
						}, {
							loader: 'postcss-loader', // Run post css actions
							options: {
								plugins() {
									// post css plugins, can be exported to postcss.config.js
									return [
										precss,
										autoprefixer
									];
								}
							}
						}, {
							loader: 'sass-loader' // compiles SASS to CSS
						}
					]
				})
			},
			{
				test: /bootstrap\/dist\/js\/umd\//,
				use: 'imports-loader?jQuery=jquery'
			},
			{
				test: /font-awesome\.config\.js/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'font-awesome-loader' }
				]
			},
			{
				test: /\.ext$/,
				use: ['cache-loader'],
				include: path.resolve('src'),
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebPackPlugin({
			template: path.resolve('public/index.html'),
			filename: "./index.html",
			hash: true
		}),
		new Dotenv({
			path: './.env.development'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			tether: 'tether',
			Tether: 'tether',
			'window.Tether': 'tether',
			Popper: ['popper.js', 'default'],
			'window.Tether': 'tether',
		}),
		new ExtractTextPlugin("tcd-style.css"),
		new CompressionPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],
	devServer: {
		port: 8001,
		publicPath: '/',
		historyApiFallback: true,
		disableHostCheck: true
	}
};
