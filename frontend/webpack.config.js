var config = {
   entry: './main.jsx', // entry point
   output: {
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
               loader: 'babel-loader',
   query: {
               presets: ['es2015', 'react'] // use es2015 and react
            }
         },
         {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader?-url', 'postcss-loader', 'sass-loader']
        },
      ]
   }
}

module.exports = config;
