<template>
	<view class="conntent">
		<!-- // map 地图 -->
			<view class="map_container" >
                <map id="mapInstance" 
				:latitude="map.latitude" 
				:longitude="map.longitude" 
				:markers="map.covers"
				:controls="map.controls"
				@controltap="controltap"
				:show-location="true">
                </map>
            </view>
	</view>
</template>

<script>
	import loadCity from '@/utils/loadCity.js'
	const _ = require('@/components/lodash/lodash.js')
	export default {
		mounted() {
			let self = this
			uni.getLocation({
				type: 'gcj02',
				success: function (res) {
					self.map.longitude = res.longitude
					self.map.latitude = res.latitude
						
					self.$log.set('location',{
						longitude: self.map.longitude,
						latitude: self.map.longitude
					})
					
					for(let i=0; i< 8; i++){
						let delta = 0.004
						var animationDelta = 0.0005
						let longitude = self.map.longitude+_.random(-delta,delta)
						let latitude = self.map.latitude+_.random(-delta,delta)
						self.map.covers.push({
							id: i,
							width : 40,
							height: 40,
							latitude: latitude,
							longitude: longitude,
							iconPath: `../../../static/img/map/bigCar${_.random(1,5)}.png`
						})
						_.delay(()=>{
							console.log('开始动画')
							self.mapMarkersAnimation(i,longitude,latitude,0,animationDelta)
						},2000)
					}
					// 获取城市信息
					loadCity(res.longitude, res.latitude).then(res => {
						self.$emit('showCityInfo',res)
					})
				}
			})
			self.amapInstance = uni.createMapContext("mapInstance")
		},
		data() {
			return {
				amapInstance: '',
				markAnimation:[],
				map:{
					title: 'map',
					latitude: 31.29579,
					longitude: 120.57186,
					covers: [],
					controls: [{
						id: 0,
						iconPath: '../../../static/img/map/location.png',
						clickable: true,
						position: {
							left: 10,
							top: 10,
							width: 20,
							height: 20
						}
					}]
				},
			};
		},
		methods:{
			controltap(e){
				console.log(e)
				console.log(this.amapInstance)
				this.amapInstance.moveToLocation()
			},
			mapMarkersAnimation(markerId,longitude,latitude,rotate,animationDelta){
				let self = this
				let new_longitude = longitude+_.random(-animationDelta,animationDelta)
				let new_latitude = latitude+_.random(-animationDelta,animationDelta)
				rotate = rotate+_.random(-90,90)
				self.amapInstance.translateMarker({
					markerId:markerId,
					destination: {latitude: latitude,longitude: longitude},
					// autoRotate: true,
					rotate: rotate,
					duration: _.random(1000,5000),
					animationEnd: ()=>{
						console.log('ended')
						_.delay(()=>{
							self.mapMarkersAnimation(markerId,new_longitude,new_latitude,rotate,animationDelta)
						},1000)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.map_container{
	width: 100%;
	height: 300upx;
	map{
		width: 100%;
		height: 100%;
	}
}
</style>
