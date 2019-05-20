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
				else if( res.data.code === 1001 ){
					_showModel(
						'提示','您未登录，请先登录',
						()=>{
							uni.navigateTo({
								url: "../../redictUrl/landing/landing",
							})
						},
						()=>{
							uni.reLaunch({
								url: '../../tabbar/index/index'
							})
						}
					)
				}
        else if( res.data.code === 1000 ){
					_showModel(
						'提示','认证信息失效，请重新登录',
						()=>{
							uni.navigateTo({
								url: "../../redictUrl/landing/landing",
							})
						},
						()=>{
							uni.reLaunch({
									url: '../../tabbar/index/index'
								})
						}
					)
        } else if( res.data.code === 2000 ){
					_showModel(
						'提示','已经存在一笔订单，点击查看',
						()=>{
							uni.navigateTo({
								url: "../../redictUrl/ordergoods/ordergoods",
							})
						}
					)
        } else {
					_showToast(res.data.msg)
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

function _showModel(title,content,Redict,cacelRedict) {
	uni.showModal({
		title: title,
		content: content,
		success(res) {
			if (res.confirm) {
				Redict && Redict()
			} else if (res.cancel) {
				cacelRedict && cacelRedict()
			}
		}
	})
}
function _showToast(msg){
	uni.showToast({
		title: msg || '502 Bad Gateway !',
		icon: 'none',
		duration: 2000
	})
}
 
function get (obj) {
  return request(obj.url, 'GET', obj.data)
}

function Delete (obj) {
  return request(obj.url, 'Delete', obj.data)
}

function post (obj) {
  return request(obj.url, 'POST', obj.data)
}
 
export default {
  request,
  get,
  post,
  Delete,
  host,
  uploadFileUrl
}