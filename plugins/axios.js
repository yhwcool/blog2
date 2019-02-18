import Qs from 'qs';
 
export default function (app) {
  let axios = app.$axios; 
  // 基本配置
  axios.defaults.timeout = 10000;
  axios.defaults.method = 'post';
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
  axios.defaults.transformRequest = [function (data) {
    data = Qs.stringify(data)
    console.log("qs",data)
    return data
  }],
 
  // 请求回调
  axios.onRequest(config => {})
 
  // 返回回调
  axios.onResponse(res => {})
 
  // 错误回调
  axios.onError(error => {})
};