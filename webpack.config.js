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
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "tonkin.js",
  }
};
