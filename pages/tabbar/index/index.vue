<template>
	<view class="content">
		<button open-type="share" class="gotoShare">
			去分享
		</button>
		<view class="header">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
			</view>	
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item>
							<view class="swiper-item">
								<image style="width: 100%;background-color: #eeeeee;" mode='aspectFill' src='../../../static/img/loginBg/login_old.jpg'
                        @error="imageError"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- link 模式，在右侧显示链接箭头 -->
			<van-notice-bar mode="link"
			speed="30"
			color="#ed6a0c"
			backgroundColor	="#fafafa"
			:text="newsList[0].title"
			@click="gotoNewsPage"
			/>
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
		
		<view class="navTabs">
			<uni-grid :options="gridTabsItems" :show-border="false"
				column-num="4" @click="changeGridTab">
			</uni-grid>
		</view>
		
		<div class="cardList">
			<div class="cardItem" v-for="(item,index) in itmes" :key="index">
				<van-card
					tag="优质"
					:desc="item.intro"
					:title="item.compName"
					:thumb="item.imageUrl"
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
import { map, forEach } from 'lodash'

export default {
	components:{
		uniGrid
	},
	mounted(){
		let self = this
		self.$request.get({
			url:"/getFunctionList/1",
		}).then(res => {
			self.gridTabsItems = map(res.functionList, item => { return {text:item.functionName,image:item.functionIconUrl}})
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
	},
	data() {
		return {
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
			title: 'Hello',
			indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500
		};
	},
	onLoad() {},
	methods: {
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
			wx.navigateTo({
				url: '../../redictUrl/news/news'
			})
		},
		submitForSearchLines(){
			let self = this
			let address = ''
			forEach(self.address, (value, key) => {
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
			let index = row.index
			switch (index){
				case 0:
					console.log('点击智能配送')
					uni.navigateTo({
						url: '../../gridTabs/intelligentDistribution/intelligentDistribution'
					})
					break;
				default:
					
					break;
			}
		}
	}
};
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
		z-index: 3;
		font-size: 28upx;
		opacity: .9;
	}
	.header{
		position: relative;
		width: 100%;
		.uni-list{
			width: 100upx;
			position: absolute;
			right: 10upx;;
			top: 18upx;
			z-index: 1;
		}
		.searchLineWrap{
			background: #fff;
			width: 96%;
			border-radius:20upx;
			padding: 60upx 0;
			box-sizing: border-box;
			margin: 20upx auto;
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
				height: 70upx;
				line-height: 70upx;
				border-radius: 80upx;
			}
		}
	}
	.navTabs{
		width: 96%;
		background: #fff;
		margin: 0 auto;
	}
	.cardList{
		width: 96%;
		margin: 0 auto;
		.cardItem{
			margin: 20upx 0;
		}
	}
}
</style>
