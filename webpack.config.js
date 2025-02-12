const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    entry: '/src/app.ts',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ["", '.ts', '.tsx', '.js', '.json']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',

    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9001,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
                {from: "./src/templates", to: "templates"},
                {from: "./src/static/images", to: "images"},
                {from: "./src/static/fonts", to: "fonts"},
                {from: "./src/components/bootstrap.js", to: "js"},
                {from: "./src/components/sidebars.js", to: "js"},
                {from: "./src/styles/bootstrap.css", to: "css"},
                {from: "./src/styles/sidebars.css", to: "css"},
                {from: "./src/styles/signin.css", to: "css"},
            ]
        })
    ]
};