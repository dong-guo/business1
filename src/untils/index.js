import { Request } from './request'
 
const enviroment = 'pro'

class IndexModel extends Request {
  baseUrl = enviroment === 'pro' ? 'https://mobiletest.derucci.net/consumer-admin':'https://qiang.derucci.com'

  getCountry(){
    return this.getList({
      url:this.baseUrl + '/api/merchants/getCountryDataList',
      // params:{
      //   contentType:'text/plain',
      //   Authorization:'Authorization'
      // }
    })
  }
}

export { IndexModel }