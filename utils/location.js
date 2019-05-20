function getLocation () {
  return new Promise((resolve, reject) => {
    uni.getLocation({
			type: 'gcj02',
			success: function (res) {
				console.log(`定位成功,坐标: ${res.longitude},${res.latitude}`)
				resolve(res)
				try {
					uni.setStorageSync('location', {
						longitude: res.longitude,
						latitude: res.latitude
					})
				} catch (e) {
					console.log('set storage error!')
				}
			}
		})
  })
}

export default {
  getLocation
}