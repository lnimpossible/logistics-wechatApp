<template>
	<view class="content">
		<button open-type="share" class="gotoShare">去分享</button>
		<view class="header">
			<!-- 公告 -->
			<van-notice-bar mode="closeable"
			speed="30"
			color="#ed6a0c"
			backgroundColor	="#fafafa"
			:text="newsList[0].title"
			/>
			<view class="page-section-spacing">
					<view class="swiperWrap page-section swiper">
						<view class="showLocation">
							<image style="width: 26upx;height:32upx;" mode="aspectFit" src="../../../static/img/icon/weizhi.png"></image>{{cityData.city || ''}}</view>
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell-db">
									<picker @change="bindPickerChange" :value="index" :range="array">
										<view style="color:#fff" class="uni-input">{{userType}}</view>
									</picker>
								</view>
							</view>
						</view>
						<!-- // 搜索框 -->
						<view class="searchLineWrap">
							<view class="chooseWrap">
								<picker class="pickerWrap" mode="region" @change="chooseStartAddress">
									<input type="text" style="font-size: 25upx;" :value="address.startCity" disabled placeholder="始发市" >		
								</picker>
								<image class="exchange-icon" src='../../../static/img/icon/fangxiang.png' mode="aspectFit" @click="exchangeAddressOrigin"></image>
								<picker class="pickerWrap" mode="region" @change="chooseEndAddress">
									<input type="text" style="font-size: 28upx;"  :value="address.endCity" disabled placeholder="目的市" >	
								</picker>
							</view>
							<button type="primary" class='searchBtn' @click="submitForSearchLines">查询</button>
						</view>
						<!-- 轮播图 -->
						<swiper class="swiper" indicator-active-color="#fff" indicator-dots="true" autoplay="true" :interval="5000" :duration="2000">
							<swiper-item v-for="(banner,index) in bannerList" :key="index">
								<view class="swiper-item">
									<image style="width: 100%;height:310upx;"  mode="aspectFit" :src="banner.bannerUrl"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
			</view>
			
			<!-- // 导航栏 -->
			<view class="navTabs">
				<view class="navTab" v-for="(nav,index) in gridTabsItems" 
				:key="index"
				 @click="changeGridTab(nav)">
					<view><image :src="nav.functionIconUrl"></image></view>
					<view>{{nav.functionName}}</view>
				</view>
			</view>
			<!-- // map 地图 -->
			<view class="dongtai">
				<image src="../../../static/img/icon/chuyuandongtai.png"></image>
				车源动态
			</view>
			<view class="map_container" >
               <map id="mapInstance" 
				:latitude="map.latitude" 
				:longitude="map.longitude" 
				:markers="map.covers"
				:controls="map.controls"
				@controltap="controltap"
				@callouttap="callouttap"
				@tap="mapTap"
				:show-location="true">
                </map>
            </view>
		</view>
		
		<!-- 专线列表 -->
		<view style="width:100%;background: #fff;">
			<view class="dongtai">
				<image src="../../../static/img/icon/huoyuanzhuangtai.png"></image>
				货源动态
			</view>
			<div class="cardList">
			<div class="cardItem" v-for="(item,index) in itmes" :key="index">
				<van-card
					tag="优质"
					:centered="true"
					:desc="item.intro"
					:title="item.compName"
					:thumb="item.imageUrl"
					link-type="navigateTo"
					:thumb-link="`../../redictUrl/company/company?compId=${item.compId}`"
				>
					<view slot="tags">
						<van-row style="margin: 5px 0 10px 0;">
							<van-col :span="8"><div style="text-align:left;font-size: 14px;">{{item.startCity}} </div></van-col>
							<van-col :span="8"><image style="width: 114upx;height:18upx;" mode="aspectFit" src="../../../static/img/icon/jiantou3x.png"></image></van-col>
							<van-col :span="8"><div style="text-align:right;font-size: 14px;">{{item.endCity}}  </div></van-col>
						</van-row>
					</view>
					<view slot="tags">
						<van-row>
							<van-col :span="16"><div class="price">重 ￥ {{item.heavyCargoFreightRate || 0}}/m³ </div></van-col>
						</van-row>
					</view>
					<view slot="tags">
						<van-row>
							<van-col :span="16"><div class="price">轻 ￥ {{item.lightCargoFreightRate || 0}}/m³ </div></van-col>
							<van-col :span="8"><view class="makePhoneCallBtn" size="mini" type="info" @click="makePhoneCall(item.compTelephone)">立即联系</view></van-col>
						</van-row>
					</view>
				</van-card>
			</div>
		</div>
		</view>
		
	</view>
</template>

<script>
import {uniGrid} from '@dcloudio/uni-ui'
const _ = require('@/components/lodash/lodash.js')
import location from '@/utils/location.js'
import loadCity from '@/utils/loadCity'
export default {
	components:{
		uniGrid
	},
	mounted(){
		this.init()
	},
	data() {
		return {
			cityData: {},
			bannerList: [{
					bannerUrl:"",
					content:"<p>我是banner</p>",
					linkUrl:"dsa",
					orderNo:1,
					tiitle:"小程序banner1"
			}],
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
						width: 30,
						height: 30
					}
				}]
			},
			amapUrl: '',
			newsList:[{title: ''}],
			itmes: [],
			address: {
			  "currPage": 1,
			  "endAreaCode": "",
			  "endCity": "",
			  "endCityCode": "",
			  "pageSize": 10,
			  "startAreaCode": "",
			  "startCity": "",
			  "startCityCode": "",
		    },
			array: ['货主', '车主'],
			userType: '货主',
            index: 0,
			gridTabsItems: [
				{image:'',text:''}
			],
			title: 'Hello'
		}
	},
	methods: {
		callouttap(e){
			console.log(e)
		},
		mapTap(){
			let self = this
			uni.navigateTo({
				url: '../../redictUrl/mapSub/mapSub'
			})
		},
		makertap: function(e) {
			var id = e.markerId;
			var that = this;
			that.showMarkerInfo(markersData,id);
			that.changeMarkerColor(markersData,id);
		  },
		init(){
			let self = this
			self.getBannerList()
			self.getFunctionList()
			self.getNews()
			self.getLines()
			self.getLocation()
			setInterval(()=>{
				self.getLocation()
			},200000)
			self.getNearbyCar()
			self.amapInstance = uni.createMapContext("mapInstance")
			// _.delay(()=>{
			// 	for(let i=0; i< 10; i++){
			// 		let delta = 0.004
			// 		var animationDelta = 0.0005
			// 		let longitude = self.map.longitude+_.random(-delta,delta)
			// 		let latitude = self.map.latitude+_.random(-delta,delta)
			// 		self.map.covers.push({
			// 			id: i,
			// 			width : 40,
			// 			height: 40,
			// 			latitude: latitude,
			// 			longitude: longitude,
			// 			iconPath: `../../../static/img/map/bigCar${_.random(1,5)}.png`
			// 		})
			// 		_.delay(()=>{
			// 			self.mapMarkersAnimation(i,longitude,latitude,0,animationDelta)
			// 		},2000)
			// 	}
			// },2000)
		},
		mapUpdate(){
			let self = this
			self.$map.getStaticmap({
				location: `${self.map.longitude},${self.map.latitude}`,
				success: res => {
					console.log(res)
					self.mapImageUrl = res.url
				}
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
						let index = _.findIndex(self.map.covers, function(o) { return o.id == driber.id; });
						if(index !== -1){
							console.log(index)
							console.log(`已经存在id为${index}的地图marker!`)
							self.map.covers[index].longitude = driber.driverlongitude
							self.map.covers[index].latitude = driber.driverLatitude
						}else{
							console.log()
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
									borderRadius:10,
									color:"#fff",
									bgColor:"#4a74ff",
									padding: 15,
									display: 'BYCLICK'
								}
							})
						}
					}
				}
			})
		},
		getNews(){
			let self = this
			self.$request.post({
				url: '/getNewsBriefList',
				data: {
					"newsType": 1
				}
			}).then(res => {
				self.newsList = res.newsBriefList
			})
		},
		getLines(){
			let self = this
			self.$request.post({
				url:'/logistics/driverDirectLine/cargoQuery',
				data:{
					"startCity":'',
					"endCity":'',
					"currPage": 1,
					"pageSize": 20
				}
			}).then(res => {
				self.itmes = res.page.list
			})
		},
		getFunctionList(){
			let self = this
			self.$request.get({
				url:"/getFunctionList/3",
			}).then(res => {
				self.gridTabsItems = res.functionList
			})
		},
		getBannerList(){
			let self = this
			self.$request.post({
				url: '/getBannerList',
				data: {
					platformType: 0
				}
			}).then(res => {
				self.bannerList = res.BannerList
			})
		},
		getLocation(){
			let self = this
			location.getLocation().then(res => {
				self.map.longitude = res.longitude
				self.map.latitude = res.latitude
				self.loadCity(res.longitude,res.latitude)
			})
		},
		sendLocation(){
			let self = this
			this.$request.post({
				url: '/user/locate',
				data: {
				  "latitude": self.map.latitude,
				  "locateAreaCode": self.cityData.adcode,
				  "locateAreaName": self.cityData.district,
				  "locateCityCode": self.cityData.citycode,
				  "locateCityName": self.cityData.city,
				  "locateProvinceName": self.cityData.province,
				  "locationInfo": "实时位置信息",
				  "longitude": self.map.longitude
				}
			})
		},
		loadCity(longitude,latitude){
			let self = this
			loadCity(longitude, latitude).then(ret => {
				self.cityData = ret.regeocode.addressComponent
				self.address.startCity = self.cityData.city
				self.address.startCityCode = self.cityData.cityCode
				self.sendLocation()
			})
		},
		checkCompInfo(compId){
			uni.navigateTo({
				url: `../../redictUrl/company/company?compId=${compId}`
			})
		},
		makePhoneCall(phone){
			uni.makePhoneCall({
				phoneNumber: phone
			})
		},
		controltap(e){
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
				rotate: rotate,
				duration: _.random(1000,5000),
				animationEnd: ()=>{
					_.delay(()=>{
						self.mapMarkersAnimation(markerId,new_longitude,new_latitude,rotate,animationDelta)
					},1000)
				}
			})
		},
		bindPickerChange(e){
			let userType = this.array[e.detail.value]
			if(userType == '车主'){
				uni.showToast({
					title: '敬请期待',
					icon: 'none',
					duration:1500
				})
			}else{
				this.userType = userType
			}
		},
		exchangeAddressOrigin(){
			let self = this
			let temp_startCity = self.address.startCity
			let temp_startCityCode = self.address.startCityCode
			let temp_startAreaCode = self.address.startAreaCode
			
			self.address.startCity = self.address.endCity
			self.address.startCityCode = self.address.endCityCode
			self.address.startAreaCode = self.address.endAreaCode
			
			self.address.endCity = temp_startCity
			self.address.endCityCode = temp_startCityCode
			self.address.endAreaCode = temp_startAreaCode
		},
		gotoNewsPage() {
			wx.switchTab({
				url: '../../tabbar/news/news'
			})
		},
		submitForSearchLines(){
			let self = this
			let address = ''
			_.forEach(self.address, (value, key) => {
				address += `&${key}=${value}`
			})
			const url = `../../redictUrl/search/search?${address}`;
			wx.navigateTo({ url})
		},
		chooseStartAddress(e){
			let address = e.detail.value
			let code = e.detail.code
			this.address.startCity = address[1] // 0 省 1市 2区
			this.address.startCityCode = code[1] // 市 codes
			this.address.startAreaCode = code[2] // 区 code
		},
		chooseEndAddress(e){
			let address = e.detail.value
			let code = e.detail.code
			this.address.endCity = address[1] // 0 省 1市 2区
			this.address.endCityCode = code[1] // 市 codes
			this.address.endAreaCode = code[2] // 区 code
		},
		changeGridTab(current){
			let self = this
			let linkUrl = current.linkUrl
			if(linkUrl){
				if(current.linkUrl.indexOf('..') > -1){
					uni.navigateTo({
						url: current.linkUrl
					})
				} else{
					uni.navigateToMiniProgram({
						appId: current.linkUrl,
						extraData: {niubi:"牛逼~。真牛逼~"},
						envVersion: 'trial',
						success: ()=>{
							console.log('跳转成功')
						},
						fail: ()=>{
							console.log('跳转failed')
						}
					})
				}
			}else{
				uni.showToast({
					title: '敬请期待',
					icon: 'none',
					duration: 2000
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	.dongtai{
		font-size: 25upx;
		width: 96%;
		margin: 20upx auto;
		image{
			width: 22upx;
			height: 22upx;
			margin-right:20upx;
		}
	}
	.gotoShare{
		margin-top: 10upx;
		width: 150upx;
		height: 150upx;
		position: fixed;
		bottom: 30upx;
		right: 10upx;
		background: #fff;
		border: 2upx solid orange;
		color: orange;
		border-radius: 75upx;
		text-align: center;
		line-height: 150upx;
		z-index: 99999;
		font-size: 28upx;
		opacity: .9;
	}
	.header{
		position: relative;
		background: #f3f6fa;
		width: 100%;
		.showLocation{
			width: 160upx;
			height: 100upx;
			color: #fff;
			font-size: 28upx;
			position: absolute;
			left: 10upx;
			top: 18upx;
			z-index: 1;
			image{
				margin-right: 20upx;
			}
		}
		.swiperWrap{
			position: relative;
			.searchLineWrap{
				position: absolute;
				left: 50%;
				bottom: -100upx;
				transform: translateX(-50%);
				z-index: 1;
				background: #fff;
				width: 96%;
				border-radius:20upx;
				padding: 20upx 0;
				box-sizing: border-box;
				.chooseWrap{
					display: flex;
					flex-wrap: nowrap;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30upx;
					.exchange-icon{
						height: 45upx;
						flex: 1;
					}
					.pickerWrap{
						text-align: center;
						flex: 3;
					}
				}
				.searchBtn{
					width: 80%;
					height: 60upx;
					line-height: 60upx;
					border-radius: 80upx;
					background: #4a74ff;
					color: #fff;
					font-size: 26upx;
				}
			}
			.swiper{
				width: 100%;
			}
			.uni-list{
				width: 100upx;
				position: absolute;
				right: 10upx;
				top: 18upx;
				z-index: 1;
				.uni-input{
					color:#555;
					font-size: 30upx;
				}
			}
		}
		
		.navTabs{
			width: 100%;
			margin: 150upx auto 25upx auto;
			.navTab{
				width: 25%;
				display: inline-block;
				text-align: center;
				font-size: 25upx;
				margin-bottom: 25upx;
				image{
					width: 50upx;
					height: 50upx;
				}
			}
			
		}
		.map_container{
			width: 96%;
			margin: 40upx auto 20upx auto;
			height: 300upx;
			border-radius: 35upx;
			overflow: hidden;
			box-shadow:0 -10upx 1upx 0upx #80a5f9,
				0 -20upx 1upx 0upx #b3cafe;
			map{
				width: 100%;
				height: 99%;
				margin-top: 0.9%;
				// border-radius: 35upx;
			}
		}
	}
	.cardList{
		width: 90%;
		margin: 0 auto;
		.cardItem{
			margin: 10upx 0;
			border-radius: 20upx;
			overflow: hidden;
			font-size: 26upx;
			.makePhoneCallBtn{
				background: #ed7331;
				color:#fff;
				padding:7upx 13upx;
				border-radius:10upx;
				font-size: 25upx;
				text-align: center;
			}
		}
	}
}
</style>
