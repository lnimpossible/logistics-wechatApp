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
		</view>
		
		<uni-grid :options="gridTabsItems" :show-border="false"
			column-num="4" @click="changeGridTab">
		</uni-grid>
	</view>
</template>

<script>
import {uniGrid} from '@dcloudio/uni-ui'
import { map } from 'lodash'
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
			console.log(res.functionList)
			// self.gridTabsItems = map(res.functionList, item => { return {text:item.functionName,image:item.functionIconUrl}})
		})
	},
	data() {
		return {
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

<style lang="scss" scoped="">

.content {
	text-align: center;
	.header{
		position: relative;
		width: 100%;
		// height: 400upx;
		margin-bottom: 20upx;
		.uni-list{
			width: 100upx;
			position: absolute;
			right: 10upx;;
			top: 18upx;
			z-index: 1;
			// background: rgba(255,255,255,.8);
		}
	}
}
</style>
