module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    ["@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ],
    'babel-plugin-transform-es2015-modules-commonjs'
  ],
};