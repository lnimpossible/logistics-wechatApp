<template>
	<view class="content">
		<swiper class="swiper" 
		:autoplay="autoplay" 
		:duration="duration">
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../../static/guide/guide03.jpg" mode="aspectFill"></image></view>
					<!-- <view class="swiper-item-img"><image src="../../../static/guide/icon_01.png" mode="aspectFit"></image></view> -->
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../../static/guide/guide01.jpg" mode="aspectFill"></image></view>
					<!-- <view class="swiper-item-img"><image src="../../../static/guide/icon_02.png" mode="aspectFit"></image></view> -->
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../../static/guide/guide02.jpg" mode="aspectFill"></image></view>
				</view>
				<view class="experience" @tap="launchFlag()">{{experience}}</view>
			</swiper-item>
			<!-- <swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../../static/guide/title_04.png" mode="aspectFit"></image></view>
					<view class="swiper-item-img"><image src="../../../static/guide/icon_04.png" mode="aspectFit"></image></view>
				</view>
				<view class="experience" @tap="launchFlag()">{{experience}}</view>
			</swiper-item> -->
		</swiper>
		<!-- <view class="uniapp-img"><image src="../../../static/guide/uniapp4@2x.png" mode="aspectFit"></image></view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验'
			}
		},
		methods: {
			launchFlag: function(){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
						key: 'launchFlag',
						data: true,
				});
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				});
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		width: 100vw;
		height: 100vh;
		background-size: 100% auto ;
		padding: 0;
	}
	.swiper{
		width: 100%;
		height: 100%;
	}
	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
		display: flex;
		/* justify-content: center; */
		align-items:flex-end;
		flex-direction:column-reverse
	}
	.swiper-item-img{
		width: 100%;
		height: 100%;
	}
	.swiper-item-img image{
		width: 100%;
		height: 100%;
	}
	.uniapp-img{
		height: 20%;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items:center;
		overflow: hidden;
	}
	.uniapp-img image{
		width: 40%;
	}
	
	.jump-over,.experience{
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: #fff;
		border: 1px solid #fff;
		z-index: 999;
	}
	.jump-over{
		right: 30upx;
		top: 45upx;
	}
	.experience{
		right: 50%;
		margin-right: -105upx;
		bottom: 20upx;
	}
</style>
