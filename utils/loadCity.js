function loadCity(longitude, latitude) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: 'https://restapi.amap.com/v3/geocode/regeo',
				data: {
					key: 'b717f36164e813fe5284cc5c67c6876e',
					location: longitude + "," + latitude,
					extensions: "all",
					s: "rsx",
					sdkversion: "sdkversion",
					logversion: "logversion"
				},
				success: function (res) {
					uni.hideLoading()
					resolve(res.data)
					// if( res.statusCode == 200 ){
					// 	resolve(res.data)
					// }else{
					// 	reject()
					// }
				},
				fail: function (res) {
					uni.hideLoading()
					console.error('loadCity fail')
				},
				complete: function () {
					uni.hideLoading()
				}
			})
		})
  }
export default loadCity