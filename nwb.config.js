module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ScrollSpy',
      externals: {
        react: 'React'
      }
    }
  }
}
