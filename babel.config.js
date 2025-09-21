module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: ['last 2 versions', 'not dead', 'not ie 11'] },
        modules: false
      }
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ]
};
