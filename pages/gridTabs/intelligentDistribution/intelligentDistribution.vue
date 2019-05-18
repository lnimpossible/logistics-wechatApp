<template>
	<view id="app">
		<div class="message">
			<div class="top">
				<image src="../../../static/img/icon/weizhi.png"></image>
				<view class="picker" @click="chooseStartNode">{{address.start || '请输入起始地'}}</view>
				<image class="replace" src="../../../static/img/icon/chongzhi.png"></image>
				<image src="../../../static/img/icon/weizhi.png"></image>
				<view class="picker" @click="chooseEndNode">{{address.end ||'请输入目的地'}}</view>
			</div>
			<div class="con">
				<input type="text" :value="goodsDescriptionData" placeholder="货物名称" placeholder-style="color:#afafaf" @change="goodsDescription" />
				<input type="number" :value="goodsWeightData" placeholder="kg" placeholder-style="color:#afafaf" @change="goodsWeight" />
				<input type="number" :value="goodsBulkData" placeholder="m3" placeholder-style="color:#afafaf" @change="goodsBulk" />
				<input type="text" :value="goodsCommentData" placeholder="备注" placeholder-style="color:#afafaf" @change="goodsComment" />
			</div>
			
			<button type="primary" class="searchBtn" @click="submitMessage">确定</button>
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
		<div class="wait" :style="styles">
			<h1>正在拼命匹配中 ...</h1>
			<cmd-progress percent="100" status="active" :show-info="false" stroke-width="15"></cmd-progress>
			<button type="default" @click="cancellation">取消订单</button>
		</div>
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
			uni.getLocation({
				type: 'gcj02',
				success: function (res) {
					self.map.longitude = res.longitude
					self.map.latitude = res.latitude
						
					self.$log.set('location',{
						longitude: self.map.longitude,
						latitude: self.map.longitude
					})
					
					for(let i=0; i< 10; i++){
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
				orderNumber: '',
				show: false,
				styles: 'display:none',
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
				this.styles = "display:none"
				let ordernumber=self.orderNumber
				this.$request.get({
					url: `/orderLogistics/cancelorder/${ordernumber}`
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
					self.orderNumber = res.matchOrderBean.orderNumber
					self.styles = "display:block"
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
			height: 100%;
			position: relative;
			top:0;
			left: 0;
			z-index: 0;
			map{
				width: 100%;
				height: 100%;
			}
		}
		.message {
			width: 96%;
			height: 270upx;
			background-color: #fff;
			border-radius: 20upx;
			position: fixed;
			top:10upx;
			left: 50%;
			transform: translateX(-50%);
			z-index: 1;
			padding: 30upx 10upx;
			box-sizing: border-box;
			border: 1upx solid #0faeff;
			.searchBtn{
				width: 90%;
				height: 60upx;
				line-height: 60upx;
				border-radius: 80upx;
				background: #0faeff;
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
			button {
				width: 320upx;
				height: 70upx;
				line-height: 70upx;
				border-radius: 50upx;
			}
		}
		.wait {
			width: 690upx;
			height: 300upx;
			back: #fff;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			z-index: 22;
			box-shadow: 0 0 6upx .2upx #666;
			padding: 30upx 40upx 0;
			h1 {
				font-size: 34upx;
				color: #333;
				text-align: center;
				margin-bottom: 10upx;
			}
			button {
				height: 120upx;
				width: 100%;
				position: fixed;
				bottom: 0;
				left: 0;
			}
		}
	}
</style>
