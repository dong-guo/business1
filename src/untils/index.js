import { Request } from './request'
 
const enviroment = 'dev'

class IndexModel extends Request {
  // baseUrl = enviroment === 'pro' ? 'https://mobiletest.derucci.net/consumer-admin':'https://qiang.derucci.com'
  baseUrl = enviroment === 'pro' ? 'https://mobiletest.derucci.net/consumer-admin':'https://op.derucci.com'

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
  selectProvincialOrCity(type,parentCode){
    return this.getParamsList({
      url:this.baseUrl +'/api/public/v1/region',
      params:{
        type:type,
        parentCode:parentCode
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
  //请求echarts列表品牌数据
  getChartList(country,type,province,city){
    return this.getParamsList({
      url:this.baseUrl + '/api/merchants/getDevelopedList',
      params:{
        country:country,
        province:province,
        city:city,
        type:type
      }
    })
  }
  //请求经销商数据
  getCanvassList(country){
    return this.getParamsList({
      url:this.baseUrl + '/api/merchants/getManagerList',
      params:{
        // page:page,
        // limit:limit,
        country:country,
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
  //未开发地区列表数据
  getUndevelopedCity(country,province,city,type){
    return this.getParamsList({
      url:this.baseUrl+'/api/merchants/getUndevelopedList',
      params:{
        country,
        province:province,
        city:city,
        type:type
      }
    })
  }
}

export { IndexModel }