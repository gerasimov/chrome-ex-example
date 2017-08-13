module.exports = {
	entry: {
		'content': './src/content.js',
		'background': './src/background.js',
		'include': './src/include.js'
	},
	output: {
		filename: '[name].js'
	},
	module: {
		rules: [
		{
		  test: /\.js$/,
		  exclude: /(node_modules|bower_components)/,
		  use: {
		    loader: 'babel-loader',
		  }
		}
		]
	}
}