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
  selectCountry(){
    return this.getList({
      url:this.baseUrl +'/api/merchants/getCountryList',
    })
  }
  selectProvincial(country){
    return this.getParamsList({
      url:this.baseUrl + '/api/merchants/getProvinceList',
      params:{
         contentType:'text/plain',
         authorization:'token'  , 
         country:country    
      }
    })
  }
  selectCity(country,province){
    return this.getParamsList({
      url:this.baseUrl + '/api/merchants/getCityList',
      params :{
        // contentType:'text/plain',
        // authorization:'token', 
        country:country,
        province:province
      }
    })
  }
  getChartList(country){
    return this.getParamsList({
      url:this.baseUrl + '/api/merchants/getDevelopedList',
      params:{
        country:country
      }
    })
  }
  getCanvassList(page,limit){
    return this.getParamsList({
      url:this.baseUrl + '/api/merchants/getManagerList',
      parmas:{
        page:page,
        limit:limit
      }
    })
  }
  getProvincialList(country){
    return this.getParamsList({
      url:this.baseUrl + '/api/merchants/getProvinceDataList',
      params:{
        country:country
      }
    })
  }
  //省份地图经销商数据
  getCityList(country,province){
    return this.getParamsList({
      url:this.baseUrl + '/api/merchants/getCityDataList',
      params:{
        country:country,
        province:province
      }
    })
  }
  getDistrictList(country,province,city){
    return this.getParamsList({
      url:this.baseUrl+'/api/merchants/getDistrictDataList',
      params:{
        country,
        province:province,
        city:city
      }
    })
  }
}

export { IndexModel }