<template>
	<view id="app">
		<div class="message">
			<view v-show="!display">
				<div class="top">
					<image src="../../../static/img/icon/weizhi.png"></image>
					<view class="picker" @click="chooseStartNode">{{address.start || '请输入起始地'}}</view>
					<image class="replace" src="../../../static/img/icon/fangxiang.png"></image>
					<image src="../../../static/img/icon/weizhi.png"></image>
					<view class="picker" @click="chooseEndNode">{{address.end ||'请输入目的地'}}</view>
				</div>
				<div class="con">
					<input type="text" :value="goodsDescriptionData" placeholder="货物名称" placeholder-style="color:#afafaf" @change="goodsDescription" />
					<input type="number" :value="goodsWeightData" placeholder="kg" placeholder-style="color:#afafaf" @change="goodsWeight" />
					<input type="number" :value="goodsBulkData" placeholder="m3" placeholder-style="color:#afafaf" @change="goodsBulk" />
					<input type="text" :value="goodsCommentData" placeholder="备注" placeholder-style="color:#afafaf" @change="goodsComment" />
				</div>
				<button type="primary" class="searchBtn" @click="submitMessage">快速匹配车辆</button>
			</view>
			<view style="width:100%;height: 210upx;" v-show="display">
				<div class="wait">
					<h1>正在拼命匹配中 ...</h1>
					<cmd-progress percent="100" status="active" :show-info="false" stroke-width="15"></cmd-progress>
					<button type="default" @click="cancellation">取消订单</button>
				</div>
			</view>
		</div>
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
		<uni-popup :show="poputs" position="middle" mode="fixed" msg="车辆匹配成功">
			<button type="primary" @click="nosatisfaction">取消</button>
			<button type="primary" @click="satisfaction">邀请</button>
		</uni-popup>
	</view>
</template>

<script>
	import {uniPopup} from "@/components/uni-popup/uni-popup.vue"
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	const _ = require('@/components/lodash/lodash.js')
	import loadCity from '@/utils/loadCity.js'
	export default {
		components: {
			uniPopup,
			cmdProgress
		},
		mounted() {
			let self = this
			self.getNearbyCar()
			setInterval(()=>{
				self.getNearbyCar()
			},2000)
			self.amapInstance = uni.createMapContext("map")
			let location = self.$log.get('location')
			self.map.longitude = location.longitude
			self.map.latitude = location.latitude
			self.amapInstance = uni.createMapContext("mapInstance")
		},
		data() {
			return {
				orderNumber: '',
				show: false,
				display: false,
				schedule: '80',
				poputs: false,
				nowTime: '',
				orderType: '2',
				goodsCommentData: '',
				goodsBulkData: '',
				goodsWeightData: '',
				goodsDescriptionData: '',
				amapInstance: '',
				markAnimation:[],
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
				address: {
					start: '',
					end: '',
					startLongitude: '120.583190',
					startLatitude: '31.298340',
					endLongitude: '121.473700',
					endLatitude: '31.230370'
				},
				chooseStartAddressData: ''
			};
		},
		methods: {
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
							let index = _.findIndex(self.map.covers, function(o) { return o.id == driber.id; });
							// console.log(driber)
							if(index !== -1){
								// console.log(index)
								// console.log(`已经存在id为${index}的地图marker!`)
								self.map.covers[index].longitude = driber.driverLongitude
								self.map.covers[index].latitude = driber.driverLatitude
							}else{
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
							}
						}
					}
				})
			},
			controltap(e){
				this.amapInstance.moveToLocation()
			},
			mapMarkersAnimation(markerId,longitude,latitude,rotate,animationDelta){
				let self = this
				let new_longitude = longitude+_.random(-animationDelta,animationDelta)
				let new_latitude = latitude+_.random(-animationDelta,animationDelta)
				rotate = rotate+_.random(-30,30)
				self.amapInstance.translateMarker({
					markerId:markerId,
					destination: {latitude: latitude,longitude: longitude},
					// autoRotate: true,
					rotate: rotate,
					duration: _.random(1000,5000),
					animationEnd: ()=>{
						_.delay(()=>{
							self.mapMarkersAnimation(markerId,new_longitude,new_latitude,rotate,animationDelta)
						},1000)
					}
				})
			},
			// 卸货地
			chooseEndNode(e){
				let self=this
				uni.chooseLocation({
					success(res) {
						self.address.endLongitude=res.longitude
						self.address.endLatitude=res.latitude
						if(res.name){
							self.address.end= res.name
						} else {
							loadCity(res.longitude,res.latitude).then(ret=>{
								console.log(ret.regeocode.addressComponent.district)
								self.address.end = ret.regeocode.addressComponent.district
							})
						}
					}	
				})
			},
			// 装货地
			 chooseStartNode(e){
			    let self = this
			    uni.chooseLocation({
			        success: res => {
						self.address.startLongitude=res.longitude
						self.address.startLatitude=res.latitude
						if(res.name){
							self.address.start= res.name
						} else {
							loadCity(res.longitude,res.latitude).then(ret=>{
								console.log(ret.regeocode.addressComponent.district)
								self.address.start = ret.regeocode.addressComponent.district
							})
						}
			        }
			    })
			},
			showCityInfo(cityInfo){
				console.log(cityInfo)
				this.address.start = cityInfo.regeocode.addressComponent.district
				let location = cityInfo.regeocode.addressComponent.streetNumber.location
				this.address.startLongitude = location.split(',')[0]
				this.address.startLatitude = location.split(',')[1]
			},
			// 货主点击取消订单
			cancellation(e) {
				let self = this
				let ordernumber=self.orderNumber
				self.$request.get({
					url: `/orderLogistics/cancelorder/${ordernumber}`
				}).then(res =>{
					self.display = false
				})
			},
			// 货主单击弹出层邀请
			satisfaction(e) {
				uni.navigateTo({
					url: '../cartlist/cartlist'
				})
			},
			// 货主单击弹出层取消
			nosatisfaction(e) {
				let self = this
				self.poputs = false
			},
			// 获取当前时间
			timeFormate() {
				let self = this
				let newDate = new Date()
				let month = newDate.getMonth()
				let date = newDate.getDate()
				let hh = newDate.getHours()
				let mm = newDate.getMinutes()
				let ss = newDate.getSeconds()
				let year = newDate.getFullYear()
				month = month + 1 < 10 ? "0" + (month + 1) : month + 1;
				date = date < 10 ? "0" + date : date;
				hh = hh < 10 ? "0" + hh : hh;
				mm = mm < 10 ? "0" +mm : mm;
				ss = ss < 10 ? "0" + ss : ss
				return year + "-" + month + "-" + date + " " + hh + ":" + mm + ":" + ss;
			},
			//单击确定按钮
			
			submitMessage(e) {
				let self = this
				self.nowTime = self.timeFormate()
				let p = self.$request.post({
					url: "/orderLogistics/add",
					data: {
						cargoName: self.goodsDescriptionData,
						cargoVolume: self.goodsBulkData,
						cargoWeight: self.goodsWeightData,
						remark: self.goodsCommentData,
						startLongitude: self.address.startLongitude,
						startLatitude: self.address.startLatitude,
						endLongitude: self.address.endLongitude,
						endLatitude: self.address.endLatitude,
						orderType: '2',
						loadDate: self.nowTime
					}
				})
				p.then(res => {
					uni.showToast({
						title: '正在持续为您匹配车辆。。。',
						icon: 'loading',
						duration: 6000
					})
					self.orderNumber = res.matchOrderBean.orderNumber
					self.display = true
				})
			},
			goodsComment(e) {
				let self = this
				self.goodsCommentData = e.detail.value
			},
			goodsBulk(e) {
				let self = this
				self.goodsBulkData = e.detail.value
			},
			goodsWeight(e) {
				let self = this
				self.goodsWeightData = e.detail.value
			},
			goodsDescription(e) {
				let self = this
				self.goodsDescriptionData = e.detail.value
			},
			chooseStartAddress(e) {
				let self = this
				let address = e.detail.value
				self.address.start = address[1]
			},
			chooseEndAddress(e) {
				let self = this
				let address = e.detail.value
				self.address.end = address[1]
			}
		}
	}
</script>

<style lang="scss" scoped>
	#app {
		width: 100%;
		.map_container{
			width: 100%;
			height: calc(100vh - 250upx);
			map{
				width: 100%;
				height: 100%;
			}
		}
		.message {
			width: 99%;
			margin: 0 auto;
			// height: 300upx;
			margin-top:5upx;
			background-color: #fff;
			border-radius: 20upx;
			padding: 25upx 0;
			border: 1upx solid #0faeff;
			.searchBtn{
				width:80%;
				height:60upx;
				line-height:60upx;
				border-radius:80upx;
				background:#4a74ff;
				color:#fff;
				font-size:26rpx;

			}
			.top {
				display: flex;
				justify-content: space-around;
				align-items: center;
				picker {
					color: #333;
					font-size: 26upx;
				}
				image {
					width: 26upx;
					height: 32upx;
					margin-right: 10upx;
				}
				.replace {
					width: 42upx;
					height: 42upx;
				}
			}
			.con {
				display: flex;
				margin: 24upx auto;
				font-size: 24upx;
				width: 96%;
				input {
					border-bottom: #afafaf 1upx solid;
				}
			}
			// button {
			// 	width: 320upx;
			// 	height: 70upx;
			// 	line-height: 70upx;
			// 	border-radius: 50upx;
			// }
		}
		.wait {
			width: 100%;
			height: 210upx;
			padding: 30upx 40upx 0;
			box-sizing: border-box;
			h1 {
				font-size: 34upx;
				color: #333;
				text-align: center;
				margin-bottom: 10upx;
			}
			button {
				width:80%;
				height:60upx;
				margin-top: 30upx;
				line-height:60upx;
				border-radius:80upx;
				background:#4a74ff;
				color:#fff;
				font-size:26upx;
			}
		}
	}
</style>