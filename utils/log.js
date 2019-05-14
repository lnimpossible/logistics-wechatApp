  // 调用API从本地缓存中获取数据
    /*
    * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
    * 微信：mpvue === wx, mpvuePlatform === 'wx'
    * 头条：mpvue === tt, mpvuePlatform === 'tt'
    * 百度：mpvue === swan, mpvuePlatform === 'swan'
    * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
    */
  let Log = {
    get: '',
    set: ''
  }
  Log.get = function (key){
    let item
    if (mpvuePlatform === 'my') {
        item = mpvue.getStorageSync({key: key}).data || ''
    } else {
        item = mpvue.getStorageSync(key) || ''
    }
    return item
  }
  Log.set = function(key,data){
    if (mpvuePlatform === 'my') {
      mpvue.setStorageSync({
        key: key,
        data: data
      })
    } else {
      mpvue.setStorageSync(key, data)
    }
  }
  export default Log
  