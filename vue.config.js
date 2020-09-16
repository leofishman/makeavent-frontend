module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  devServer:{
    disableHostCheck:true
  },
  outputDir: '/home/makeavent/frontend/builds/fas'
}
