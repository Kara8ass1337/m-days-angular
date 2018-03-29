const GLOBALS = require('dot-globals')();
const webpack = require('webpack');
const resolve = require('path').resolve;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const argv = require('yargs').argv;
const rootPath = resolve(__dirname, '../');

if (!GLOBALS.serverHost) {
    console.warn('Warning: Server host does not specified!');
}

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
        new webpack.HotModuleReplacementPlugin({
            multiStep: false
        }),
        new HtmlWebpackPlugin({
            template: `${rootPath}/src/index.html`
        }),
        new CopyWebpackPlugin([{
            from: `${rootPath}/public/`,
            to: `${rootPath}/build/`,
            ignore: [{
                dots: true,
                glob: 'img_bg_sources/**/*'
            }]
        }]),
        new OpenBrowserPlugin({
            url: GLOBALS.webpackUrl
        })
    ],
    context: rootPath,
    resolve: {
        extensions: ['.js', '.css', '.styl', '.json', '.md'],
        modules: ['src', 'node_modules'],
        alias: {
            src: `${rootPath}/src`
        }
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
        host: GLOBALS.webpackHost,
        port: GLOBALS.webpackPort,
        inline: true,
        hot: true,
        proxy: {
            '/' : {
                target: GLOBALS.serverUrl,
                secure: false
            }
        },
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
