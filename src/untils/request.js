import axios from 'axios'
class Request {
  getList({url,method='GET'}) {
    return new Promise((resolve,reject)=>{
      axios({
        url:url,
        method:method
      }).then(res=>{
        resolve(res)
      }).catch(err =>{
        reject(err)
      })
    })
  }

  getParamsList({url,params,method='GET'}){
    return new Promise((resolve,reject) =>{
      axios({
        url:url,
        params:params,
        method:method,
      }).then(res=>{
        resolve(res)
      }).catch(err =>{
        reject(err)
      })
    })
  }
}

export {Request}