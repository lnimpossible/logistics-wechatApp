export default function (longitude, latitude) {
    var _self = this;
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      data: {
        key: '你的高德key',
        location: longitude + "," + latitude,
        extensions: "all",
        s: "rsx",
        sdkversion: "sdkversion",
        logversion: "logversion"
 
      },
      success: function (res) {
        _self.setData({
          city: res.data.regeocode.addressComponent.city
        })
        // console.log(res.data.regeocode.addressComponent.city);
      },
      fail: function (res) {
        console.log('获取地理位置失败')
      }
    })
  }