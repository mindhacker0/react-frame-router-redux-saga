const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devmode = process.env.NODE_ENV !== "production";
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// PostCss 浏览器css兼容
const autoprefixer = require("autoprefixer");
const postcssVars = require("postcss-simple-vars");
const postcssImport = require("postcss-import");
module.exports={
	entry:"./src/main/index.js",
	output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[hash].js",
      chunkFilename: "chunks/[name].[hash].js",
	},
	devServer: {
		open:true,
		port: process.env.PORT || 8085,
		historyApiFallback:true
	},
	plugins: [
		new webpack.DefinePlugin({
		  "process.env": {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			baseUrl: devmode ? "'http://192.168.1.222:80'" : "''",
		  },
		}),
		new HtmlWebpackPlugin({
            template: './src/main/index.html', //指定模板路径
            filename: 'index.html', //指定文件名
		}),
		new MiniCssExtractPlugin({
			filename: "static/css/[name].[hash].css",
			chunkFilename: "static/css/[id].css",
		}),
		new OptimizeCssAssetsPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
			  productionSourceMap:true
			}
		})
    ],
	module: {
		rules: [
			{
				test: /\.jsx |.js$/, ///\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					query: {
					plugins: [
						"@babel/plugin-syntax-dynamic-import",
						"@babel/plugin-transform-runtime",
						"@babel/plugin-transform-async-to-generator",
					],
					presets: ["@babel/preset-env", "@babel/preset-react"],
					compact: true,
					},
				},
			},
			{
				test: /\.html$/,
				use: [
					{
					loader: "html-loader",
					options: { minimize: true },
					},
				],
			},
			{
				test: /\.(ico|png|jpg|jpeg|gif|svg|cur|ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader",
				options: {
					name: path.posix.join("static/assets/", "[name].[hash:7].[ext]"),
				},
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "resolve-url-loader",
						options: {},
					},
					{
						loader: "sass-loader",
						options: { sourceMap: true },
					},
				],
			},
			{
				test: /\.(css|less)$/,
				use: [
					{
					   loader: "style-loader",
					},
					{
						loader: "css-loader",
						options: {
							modules: {
							localIdentName: "[name]_[local]_[hash:base64:5]",
							},
							importLoaders: 1,
							localsConvention: "camelCase",
						},
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: function () {
							return [
								postcssImport,
								postcssVars,
								autoprefixer({
								overrideBrowserslist: [
									"last 3 versions",
									"Safari >= 8",
									"iOS >= 8",
								],
								}),
							];
							},
						},
					},
				],
			},
		]
	}
}