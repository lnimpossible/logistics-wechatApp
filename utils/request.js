const host = 'https://api.ky7777t.com/api'
const uploadFileUrl = 'https://api.ky7777t.com/api/uploadFile/upload'

function request (url, method, data, header = {}) {
  uni.showLoading({
    title: '加载中' // 数据请求前loading
  })
  try {
    const token = uni.getStorageSync('userInfo').token
    if (token) {
      header = {
        'content-type': 'application/json',
        'token': token
      }
    }else{
			header = {
				'content-type': 'application/json',
				'token':'4e0c37c15de24b3c90075dfa23f0b6c3'
			}
		}
  } catch (e) {
    header = {
      'content-type': 'application/json',
    }
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: host + url, // 接口地址
      method: method,
      data: data,
      header: header,
      success: function (res) {
        console.log(res.data)
        uni.hideLoading()
				if( res.data.code === 0 ){
					resolve(res.data)
				}
        else if( res.data.code === 1000 ){
          uni.showModal({
            title: '提示',
            content: '身份过期，请重新登录',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                uni.navigateTo({
                  url: "../../redictUrl/landing/landing",
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
								uni.reLaunch({
									url: '../../tarbar/index/index'
								})
              }
            }
          })
        } else {
          uni.showToast({
          	title: res.data.msg || '502 Bad Gateway !',
						icon: 'none'
          })
        }
      },
      fail: function (res) {
        uni.hideLoading()
        // reject(false)
      },
      complete: function () {
        uni.hideLoading()
      }
    })
  })
}
 
function get (obj) {
  return request(obj.url, 'GET', obj.data)
}
 
function post (obj) {
  return request(obj.url, 'POST', obj.data)
}
 
export default {
  request,
  get,
  post,
  host,
  uploadFileUrl
}