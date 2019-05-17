function loadCity(longitude, latitude) {
    let _self = this;
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
					if( res.statusCode == 200 ){
						resolve(res.data)
					}
				},
				fail: function (res) {
					uni.hideLoading()
				},
				complete: function () {
					uni.hideLoading()
				}
			})
  })
  }
	
	export default loadCity