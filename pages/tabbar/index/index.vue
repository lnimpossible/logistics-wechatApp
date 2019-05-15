<template>
	<view class="content">
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
								<image style="width: 100%;background-color: #eeeeee;" mode='scaleToFill' src='../../../static/img/loginBg/login_old.jpg'
                        @error="imageError"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="searchLineWrap">
				<view class="chooseWrap">
					<picker class="pickerWrap" mode="region" @change="chooseStartAddress">
						<input type="text" :value="address.startCity" disabled placeholder="始发市" >		
					</picker>
					<image class="exchange-icon" src='../../../static/img/icon/chongzhi.png' mode="aspectFit" ></image>
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
		let p = self.$request.get({
			url:"/getFunctionList"
		})
		p.then(res => {
			self.gridTabsItems = map(res.functionList, item => { return {text:item.functionName,image:item.functionIconUrl}})
		})
	},
	data() {
		return {
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
		submitForSearchLines(){
			let self = this
			let address = ''
			forEach(self.address, (value, key) => {
				address += `&${key} = ${value}`
			})
			console.log(address)
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
	.header{
		position: relative;
		width: 100%;
		.uni-list{
			width: 100upx;
			position: absolute;
			right: 10upx;;
			top: 18upx;
			z-index: 1;
			// background: rgba(255,255,255,.8);
		}
		.searchLineWrap{
			background: #fff;
			width: 96%;
			border-radius:20upx;
			padding: 60upx 0;
			box-sizing: border-box;
			margin: 20upx auto;
			// position: relative;
			// top: -80upx;
			// left: 50%;
			// transform: translateX(-50%);
			// z-index: 1;
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
		// margin-top: 30upx;
		// margin-top: - 100upx;
	}
}
</style>
