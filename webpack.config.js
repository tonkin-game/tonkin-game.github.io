const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  externals: {
    'pixi.js': "PIXI"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: 60,
                      firefox: 55,
                      ie: 11
                    }
                  }
                ],
                '@babel/preset-react'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "tonkin.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css"
    })
  ]
};
