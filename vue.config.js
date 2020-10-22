module.exports = {   
  publicPath: process.env.NODE_ENV === 'production' ? './' : './'  ,
};
//处理招商设备安卓低版本问题
// module.exports = {
//   transpileDependencies: ['webpack-dev-server/client'],
// 	chainWebpack: config => {
//     config.entry.app = ['babel-polyfill', './src/main.js'];
// 	}
// }
