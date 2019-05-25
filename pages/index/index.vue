<template>
	<view class="content">
	</view>
</template>

<script>
	export default {
		onLoad(){
			try {
				const value = uni.getStorageSync('launchFlag');
				if (value) {
					if (value == true) {
						uni.switchTab({
							url: '/pages/tabbar/index/index'
						});
					} else {
						uni.redirectTo({
							url: '/pages/tabbar/index/guide'
						});
					}
				} else {
					uni.setStorage({
						key: 'launchFlag',
						data: true
					});
					uni.redirectTo({
						url: '/pages/tabbar/index/guide'
					});
				}
			} catch(e) {
				// error 
				uni.setStorage({ key: 'launchFlag', 
					data: true
				}); 
				uni.redirectTo({ 
					url: '/pages/index/guide' 
				}); 
			}
		},
	}
</script>
<style>
	page,
	.content{
		width: 100%;
		height: 100%;
		background-size: 100% auto ;
		padding: 0;
	}
	.swiper{
		width: 100%;
		height: 80%;
		background: #FFFFFF;
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
		height: auto;
		margin: 0 auto;
	}
	.swiper-item-img image{
		width: 80%;
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
		color: #454343;
		border: 1px solid #454343;
		z-index: 999;
	}
	.jump-over{
		right: 45upx;
		top: 125upx;
	}
	.experience{
		right: 50%;
		margin-right: -105upx;
		bottom: 0;
	}
</style>
