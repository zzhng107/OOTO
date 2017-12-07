const path = require('path');

var config = {
    entry: './main.jsx', // entry point
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'index.js', // place where bundled app will be served
    },

    devServer: {
        inline: true, // autorefresh
        port: 8080 // development port server
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, // search for js files 
                exclude: /node_modules/,
                loader: 'babel-loader',//'class-to-classname'
                query: {
                    presets: ['es2015', 'react'] // use es2015 and react
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader?-url', 'sass-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader?-url']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "class-to-classname"
            }
        ]
    }
}

module.exports = config;
