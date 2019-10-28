module.exports = {   
  publicPath: process.env.NODE_ENV === 'production' ? './' : './'  ,
  //----------------以下自己写
  // runtimeCompiler:true,
  // devServer:{
  //   open:process.platform === 'darwin',
  //   host: 'localhost',
  //   port: 8080,
  //   open: true, 
  //   proxy: {
  //     '/api': {
  //       target: 'https://mobiletest.derucci.net/consumer-admin/', //对应自己的接口
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }
};