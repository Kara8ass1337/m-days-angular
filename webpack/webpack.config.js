const webpack = require('webpack');
const resolve = require('path').resolve;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const argv = require('yargs').argv;

const extractStyles = new ExtractTextPlugin({
    filename: '[name].css',
    disable: process.env.NODE_ENV === 'development'
});

const stylesLoadersChunk = ({test, loader, options} = {}) => {
    return {
        test,
        exclude: /node_modules/,
        use: extractStyles.extract({
            use: [{
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    importLoaders: 0,
                    modules: false
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: [require('autoprefixer')()]
                }
            }, {
                loader,
                options
            }],
            fallback: 'style-loader'
        })
    }
};

const rootPath = resolve(__dirname, '../');

module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: `${rootPath}/src/index.js`
    },
    output: {
        path: `${rootPath}/build/`,
        filename: '[name].js',
    },
    plugins: [
        new CleanWebpackPlugin(`${rootPath}/build/*`, {
            root: `${rootPath}/build/`,
            exclude: ['.gitkeep'],
        }),
        extractStyles,
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: `${rootPath}/src/index.html`
        }),
        new CopyWebpackPlugin([{
            from: `${rootPath}/public/`,
            to: `${rootPath}/build/`
        }]),
        new OpenBrowserPlugin({
            url: 'http://localhost:8081'
        })
    ],
    context: rootPath,
    resolve: {
        extensions: ['.js', '.css', '.json', '.md'],
        modules: ['src', 'node_modules'],
        alias: {}
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, stylesLoadersChunk({
            test: /\.scss$/,
            loader: 'sass-loader',
            options: {
                sourceMap: true,
                includePaths: [`${rootPath}/src`],
                outputStyle: 'collapsed'
            }
        }), stylesLoadersChunk({
            test: /\.styl$/,
            loader: 'stylus-loader',
            options: {
                preferPathResolver: 'webpack'
            }
        }), {
                test: /\.css$/,
                use: 'css-loader?sourceMap=true',
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf)$/,
                use: 'file-loader?name=[name].[ext]&outputPath=./assets/'
            }, {
                test: /\.html$/,
                use: 'raw-loader'
            }]
    },
    devServer: {
        host: 'angular-test.loc',
        port: '8081',
        //public: '192.168.1.7:8081',
        contentBase: resolve(__dirname, '../public'),
        publicPath: '/',
        historyApiFallback: {
            rewrites: [
                {from: /./, to: '/err-404.html'}
            ]
        },
        //hot: true
    }
};
