  // 调用API从本地缓存中获取数据
  let Log = {
    get: '',
    set: ''
  }
  Log.get = function (key){
    let item
		try {
			item = uni.getStorageSync(key) || ''
		} catch (e) {
				console.log('get storage error!')
		}
    return item
  }
  Log.set = function(key,data){
		try {
			uni.setStorageSync(key, data)
		} catch (e) {
			console.log('set storage error!')
		}
  }
  export default Log
  