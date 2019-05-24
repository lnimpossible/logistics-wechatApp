<template>
	<view class="content">
		<!-- <view class="searchCar">
		</view> -->
		<view class="map_container">
			<map class="map" id="map" 
			:latitude="map.latitude" 
			:longitude="map.longitude" 
			:markers="map.covers"
			:polyline="polyline"
			:show-location="true"
			:include-points="map.points"
			scale="13"
			:controls="map.controls"
			@markertap="makertap"
			@tap="mapTap"
			@controltap="controltap"
			>
			<!-- <cover-view v-show="display" class="controls-SearchCarNumber">
				<cover-viw>
					输入车牌号查找车辆
					<button></button>
				</cover-viw>
			</cover-view> -->
			<cover-view v-show="display" class="controls-title">
				<cover-view class="carTips">
					{{currentMark.extData.vehicleTypeName}}
				</cover-view>
				<cover-view class="carTips">
					{{currentMark.extData.licencePlate}}
				</cover-view>
				<cover-view class="operatorArea">
					<button class="checkCarLineBtn" type="primary" @click="checkHistoryRoad(currentMark.id)">查看历史轨迹</button>
					<button class="makePhoneCallBtn" type="primary" @click="makePhoneCall(currentMark.extData.driverPhoneNumber)">立即联系</button>
				</cover-view>
				<cover-view class="scrollXArea">
					<cover-view class="scrollXAreaInner">
						<cover-image v-show="currentMark.extData" class="carImge" :src="currentMark.extData.imageUrl1"></cover-image>
						<cover-image v-show="currentMark.extData" class="carImge" :src="currentMark.extData.imageUrl2"></cover-image>
						<cover-image v-show="currentMark.extData" class="carImge" :src="currentMark.extData.imageUrl3"></cover-image>
						<cover-image v-show="currentMark.extData" class="carImge" :src="currentMark.extData.imageUrl4"></cover-image>
						<cover-image v-show="currentMark.extData" class="carImge" :src="currentMark.extData.imageUrl5"></cover-image>
					</cover-view>
				</cover-view>
			</cover-view>
			</map>
		</view>
	</view>
</template>

<script>
	const _ = require('@/components/lodash/lodash.js')
	import location from '@/utils/location.js'
	import getDrivingRoute from '@/utils/getDrivingRoute.js'
	export default {
		onReady() {
			this.init()
		},
		// onLoad:function(options){
		// 	// 生命周期函数--监听页面加载
		// },
		methods:{
			init(){
				this.getNearbyCar()
				this.showPageTips()
				this.amapInstance = uni.createMapContext("map")
			},
			showPageTips(){
				uni.showToast({
					title: '点击车辆，联系车主',
					icon: 'none',
					duration: 4000
				})
			},
			controltap(e){
				this.amapInstance.moveToLocation()
			},
			getLocation(){
				let self = this
				location.getLocation().then(res => {
					self.map.longitude = res.longitude
					self.map.latitude = res.latitude
				})
			},
			getNearbyCar(){
				let self = this
				let nearDistance = 1000
				this.$request.get({
					url: `/logistics/queryRoundVehicle/${nearDistance}`
				}).then(res => {
					let driberList = res.driberList
					if(res.driberList.length > 0){
						let points = []
						for(let i=0;i<driberList.length;i++){
							let driber = driberList[i]
							// let index = _.findIndex(self.map.covers, function(o) { return o.id == driber.id; });
							// console.log(driber)
							// if(index !== -1){
							// 	console.log(index)
							// 	console.log(`已经存在id为${index}的地图marker!`)
							// 	self.map.covers[index].longitude = driber.driverLongitude
							// 	self.map.covers[index].latitude = driber.driverLatitude
							// }else{
								// console.log('不存在')
								self.map.covers.push({
									id: driber.id,
									extData: driber,
									width : 40,
									height: 40,
									latitude: driber.driverLatitude,
									longitude: driber.driverLongitude,
									iconPath: driber.vehicleMapIcon,
									callout: {
										content: `${driber.vehicleTypeName}\n${driber.licencePlate}`,
										fontSize: 10,
										color:"#fff",
										bgColor:"#4a74ff",
										padding: 5,
										display: 'ALWAYS'
									}
								})
							// }
						}
					}
					// console.log(self.map)
				})
			},
			makePhoneCall(phone){
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			checkHistoryRoad(carId){
				let self = this
				self.$request.post({
					url: '/logistics/driverVehicleInfo/getInfo',
					data: {
						id: carId,
						day: 10
					}
				}).then(res => {
					let points = []
					let driverPointsArray = []
					self.polyline[0].points = []
					let trackList
					if(res.driverVehicleInfo){
						trackList = res.driverVehicleInfo.trackList
					}else{
						uni.showToast({
							title: '未查询到历史轨迹'
						})
						return
					}
					let mapViewIncludePoints = []
					for(let i=0; i< trackList.length - 1; i++){
						let origin = `${trackList[i].longitude},${trackList[i].latitude}`
						let destination = `${trackList[i+1].longitude},${trackList[i+1].latitude}`
						mapViewIncludePoints.push({latitude:trackList[i].latitude,longitude:trackList[i].longitude})
						
						getDrivingRoute(origin,destination).then(stepPoints => {
							self.polyline[0].points = [...self.polyline[0].points,...stepPoints]
						})
					}
					console.log(mapViewIncludePoints)
					console.log(self.amapInstance)
					self.amapInstance.includePoints({
						points: mapViewIncludePoints
					})
				})
			},
			mapTap(){
				this.display = false
				this.polyline[0].points = []
			},
			makertap: function(e) {
				console.log(e)
				let id = e.markerId;
				let self = this;
				self.showMarkerInfo(id);
			  },
		   showMarkerInfo(markId){
			var self = this
			self.currentMark= self.map.covers.find(function (x) {
				return x.id === markId
			})
			self.display = true
		  }
		},
		data() {
			return {
				appPlusMap: '',
				amapInstance: '',
				polyline:[
					{  //指定一系列坐标点，从数组第一项连线至最后一项
						points:[],
						color:"#0000AA",//线的颜色
						width:2,//线的宽度
						dottedLine:false,//是否虚线
						arrowLine:true,	//带箭头的线 开发者工具暂不支持该属性
					}
				],
				display: false,
				currentMark:{extData:{
					imageUrl1:'',
					imageUrl2:'',
					imageUrl3:'',
					imageUrl4:'',
					imageUrl5:''
				}},
				map:{
					title: 'map',
					latitude: 31.29579,
					longitude: 120.57186,
					covers: [],
					points:[],
					controls: [{
						id: 0,
						iconPath: '../../../static/img/map/location.png',
						clickable: true,
						position: {
							left: 13,
							top: 13,
							width: 30,
							height: 30
						}
					}]
				},
				textData:{name:'',desc:''}
			};
		}
	}
</script>

<style lang="scss">
.content{
	width: 100vw;
	height:100vh;
	position: relative;
	.map_container{
	  position: absolute;
	  top: 0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  .map{
		  width: 100%;
		  height: 100%;
		  position: relative;
			  .controls-title {
				width: 100%;
				background: #fff;
				padding: 26upx;
				box-sizing: border-box;
				border-radius: 20upx;
				position: absolute;
				bottom:0;
				left:0;
				.carTips{
					font-size: 30upx;
					padding: 10upx 0;
					box-sizing: border-box;
					width: 50%;
					text-align: center;
					display: inline-block;
				}
				.operatorArea{
					width: 100%;
					.checkCarLineBtn{
						margin-left: 5%;
						margin-right: 5%;
						width: 40%;
						height: 60upx;
						line-height: 60upx;
						border-radius: 80upx;
						background: #4a74ff;
						color: #fff;
						font-size: 26upx;
						display: inline-block;
					}
					.makePhoneCallBtn{
						margin-left: 5%;
						width: 40%;
						height: 60upx;
						line-height: 60upx;
						border-radius: 80upx;
						background: #4a74ff;
						color: #fff;
						font-size: 26upx;
						display: inline-block;
					}
				}
				.scrollXArea{
					width: 100vw;
					height: 150upx;
					.scrollXAreaInner{
						width: 100vw;
						height: 100%;
						.carImge{
							width: 20%;
							heiht: auto;
							padding: 15upx;
							box-sizing: border-box;
							display: inline-block;
						}
					}
				}
			}
		}
	}
	
	
}
</style>
