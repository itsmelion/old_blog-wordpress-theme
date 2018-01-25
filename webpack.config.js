require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const extractSass = new ExtractTextWebpackPlugin({
    filename: '[name].css',
    disable: false,
});

// const minify = {
//     collapseWhitespace: true,
//     conservativeCollapse: true,
//     removeComments: true,
// };
const config = {
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, process.env.themeDirectory),
        publicPath: process.env.themeDirectory,
    },
    resolve: {
        extensions: ['.ts', '.php', '.js', '.json'],
    },
    plugins: [
        new CleanWebpackPlugin(['../expat'], {allowExternal: true}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Tether: 'tether',
            Drop: 'tether-drop',
            Popper: 'popper.js'
        }),
        new webpack.WatchIgnorePlugin([
            /\.d\.ts$/
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: Infinity
        }),
        // new HtmlWebpackPlugin({
        //     template: `!!raw-loader!${path.join(__dirname, 'src/theme/index.php')}`,
        //     filename: 'index.php',
        //     chunks: ['main', 'commons'],
        //     transpile: false,
        //     minify,
        // }),
        extractSass,
        new CopyWebpackPlugin ([
            { from: './src/theme', to: './' }
        ]),
        new BrowserSyncPlugin({
            port: 3000,
            proxy: process.env.appURL,
            watchOptions: {
                include: process.env.themeDirectory,
                ignoreInitial: true,
                ignored: './src'
            },
            injectChanges: true,
            ui: false,
            ghostMode: false,
            logPrefix: process.env.appName,
            logFileChanges: true
        }, {
            reload: true
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, "src"),
            exclude: /node_modules/,
        },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test: /\.s[ac]ss$/,
            loader: extractSass.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'sass-loader'
                },
                ],
                fallback: 'style-loader',
            }),
        },
        {
            test: /\.(jpe?g|png|gif|svg)/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context: './src'
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
                    }
                },
            ],
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.php$/,
            use: [
                'raw!html-minifier-loader'
            ]
        }
        ],
    },
};

if (process.env.NODE_ENV === 'development') {
    config.watch = true;
    config.devtool = 'source-map';
    config.plugins.push( new webpack.HotModuleReplacementPlugin() );
} else {
    config.plugins.push([
        new UglifyJSPlugin(),
        new CompressionWebpackPlugin({
            asset: '[path].gz',
        }),
        new ManifestPlugin()
    ]);
}
module.exports = config;