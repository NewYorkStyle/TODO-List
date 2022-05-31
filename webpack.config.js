const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/static/index.html',
    filename: './index.html',
});

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                use: ['ts-loader'],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [htmlPlugin],
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /node_modules/,
                },
            },
        },
    },
};
