const webpack = require('webpack'),
	ProgressBarPlugin = require('progress-bar-webpack-plugin'),
	WebpackNotifierPlugin = require('webpack-notifier');

var production = (process.env.NODE_ENV === 'production'),
	plugins = [
		new WebpackNotifierPlugin({
			alwaysNotify: true
		}),
		new ProgressBarPlugin()
	];

if (production) {
	plugins = plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false
			}
		}),
	]);
} else {
	plugins = plugins.concat([
		new webpack.LoaderOptionsPlugin({
			debug: true
		})
	]);
}

var config = {
	devtool: production ? 'source-map' : 'inline-source-map',
	cache: !production,
	resolve: {
		extensions: ['.js', '.jsx']
	},
	entry: {
		main: './src/bootstrap/bootstrap.js',
		view: './src/bootstrap/bootstrap-view.js'
	},
	output: {
		path: 'public_html/dist/js',
		filename: '[name].js',
		publicPath: 'public_html/dist/js/'
	},
	plugins: plugins,
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.svg$/,
			loader: 'svg-sprite-loader?' + JSON.stringify({
				name: 'icon-[1]',
				prefixize: true,
				regExp: './img/svg/(.*)\\.svg'
			})
		},{
			test: /\.scss$/,
			use: [{
				loader: 'style-loader' // creates style nodes from JS strings
			}, {
				loader: 'css-loader' // translates CSS into CommonJS
			}, {
				loader: 'sass-loader' // compiles Sass to CSS
			}]
		}]
	}
};

module.exports = config;