<template>
	<view class="content">
		<button open-type="share" class="gotoShare">去分享</button>
		<view class="header">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{userType}}</view>
						</picker>
					</view>
				</view>
			</view>	
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" indicator-active-color="#fff" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
						<swiper-item v-for="(banner,index) in bannerList" :key="index">
							<view class="swiper-item">
								<image style="width: 100%;background-color: #eeeeee;" mode='aspectFill' :src='banner.bannerUrl'
								@error="imageError"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- 公告 -->
			<van-notice-bar mode="link"
			speed="30"
			color="#ed6a0c"
			backgroundColor	="#fafafa"
			:text="newsList[0].title"
			@click="gotoNewsPage"
			/>
			<!-- // 导航栏 -->
			<view class="navTabs">
				<uni-grid :options="gridTabsItems" :show-border="false"
					column-num="4" @click="changeGridTab">
				</uni-grid>
			</view>
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
			<!-- // 搜索框 -->
			<view class="searchLineWrap">
				<view class="chooseWrap">
					<picker class="pickerWrap" mode="region" @change="chooseStartAddress">
						<input type="text" :value="address.startCity" disabled placeholder="始发市" >		
					</picker>
					<image class="exchange-icon" src='../../../static/img/icon/chongzhi.png' mode="aspectFit" @click="exchangeAddressOrigin"></image>
					<picker class="pickerWrap" mode="region" @change="chooseEndAddress">
						<input type="text" :value="address.endCity" disabled placeholder="目的市" >	
					</picker>
				</view>
				<button type="primary" class='searchBtn' @click="submitForSearchLines">查询</button>
			</view>
		</view>
		
		<!-- 专线列表 -->
		<div class="cardList">
			<div class="cardItem" v-for="(item,index) in itmes" :key="index">
				<van-card
					tag="优质"
					:desc="item.intro"
					:title="item.compName"
					:thumb="item.imageUrl"
					link-type="navigateTo"
					:thumb-link="`../../redictUrl/company/company?compId=${item.compId}`"
				>
					<view slot="tags">
						<van-row style="margin: 5px 0 10px 0;">
							<van-col :span="7"><div style="text-align:left;font-size: 14px;">{{item.startCity}} </div></van-col>
							<van-col :span="3"><div style="text-align:center;font-size: 14px;"><van-icon custom-style="padding-top:0x;" name="exchange" /> </div></van-col>
							<van-col :span="7"><div style="text-align:right;font-size: 14px;">{{item.endCity}}  </div></van-col>
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
							<van-col :span="8"><van-button size="mini" type="info" @click="makePhoneCall(item.compTelephone)"><van-icon name="phone" color="#fff" size="18px" /></van-button></van-col>
						</van-row>
					</view>
				</van-card>
			</div>
		</div>
	</view>
</template>

<script>
import {uniGrid} from '@dcloudio/uni-ui'
const _ = require('@/components/lodash/lodash.js')
import loadCity from '@/utils/loadCity.js'
// const amapFile = require('@/common/amap-wx.js');
export default {
	components:{
		uniGrid
	},
	onLoad() {
		let self = this
	},
	mounted(){
		let self = this
		self.$request.post({
			url: '/getBannerList',
			data: {
				platformType: 0
			}
		}).then(res => {
			self.bannerList = res.BannerList
		})
		uni.getLocation({
			type: 'gcj02',
			success: function (res) {
				self.map.longitude = res.longitude
				self.map.latitude = res.latitude
					
				self.$log.set('location',{
					longitude: self.map.longitude,
					latitude: self.map.longitude
				})
				// 获取城市信息
				loadCity(res.longitude, res.latitude).then(res => {
					self.cityData = res.regeocode.addressComponent
					self.address.startCity = self.cityData.city
					self.address.startCityCode = self.cityData.cityCode
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
						self.mapMarkersAnimation(i,longitude,latitude,0,animationDelta)
					},2000)
				}
			}
		})
		self.$request.get({
			url:"/getFunctionList/1",
		}).then(res => {
			self.gridTabsItems = _.map(res.functionList, item => { 
				return {
					text:item.functionName,image:item.functionIconUrl,
					linkUrl: item.linkUrl
				}})
		})
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
		self.$request.post({
			url: '/getNewsBriefList',
			data: {
				"newsType": 1
			}
		}).then(res => {
			self.newsList = res.newsBriefList
		})
		self.amapInstance = uni.createMapContext("mapInstance")
	},
	data() {
		return {
			cityData: {},
			bannerList: [{
					bannerUrl:"https://img.ky7777t.com/20190517/ed54746f6f154bd8b2ec2dbb4a5f932f.jpg",
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
						width: 20,
						height: 20
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
				{image:'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png',text:'圣诞树'},
				{image:'https://img-cdn-qiniu.dcloud.net.cn/img/lindang.png',text:'铃铛'},
				{image:'https://img-cdn-qiniu.dcloud.net.cn/img/laoren.png',text:'圣诞老人'},
				{image:'https://img-cdn-qiniu.dcloud.net.cn/img/liwu.png',text:'礼物'},
				{image:'https://img-cdn-qiniu.dcloud.net.cn/img/maozi.png',text:'帽子'},
				{image:'https://img-cdn-qiniu.dcloud.net.cn/img/shoutao.png',text:'手套'},
				{image:'https://img-cdn-qiniu.dcloud.net.cn/img/xueqiao.png',text:'雪橇'},
				{image:'https://img-cdn-qiniu.dcloud.net.cn/img/xunlu.png',text:'驯鹿'},
			],
			title: 'Hello'
		}
	},
	methods: {
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
		bindPickerChange(e){
			this.userType = this.array[e.detail.value]
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
		changeGridTab(row){
			let self = this
			let index = row.index
			let current = self.gridTabsItems[index]
			if(current.linkUrl){
				uni.navigateTo({
					url: current.linkUrl
				})
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
		width: 100%;
		.uni-list{
			width: 100upx;
			position: absolute;
			right: 10upx;
			top: 18upx;
			z-index: 1;
			.uni-input{
				color:#555;
				font-size: 40upx;
			}
		}
		.navTabs{
			width: 100%;
			background: #fff;
			margin: 10upx auto;
		}
		.map_container{
			width: 100%;
			height: 300upx;
			map{
				width: 100%;
				height: 100%;
			}
		}
		.searchLineWrap{
			background: #fff;
			width: 96%;
			border-radius:20upx;
			padding: 20upx 0;
			box-sizing: border-box;
			margin: 10upx auto;
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
				width: 90%;
				height: 60upx;
				line-height: 60upx;
				border-radius: 80upx;
				background: #0faeff;
			}
		}
	}
	.cardList{
		width: 96%;
		margin: 0 auto;
		.cardItem{
			margin: 10upx 0;
		}
	}
}
</style>
