<template>
	<view id="app">
		<div class="message">
			<div class="top">
				<image src="../../../static/img/icon/weizhi.png"></image>
				<input type="text" value="请选择始发地" @click="startadress">
				<image class="replace" src="../../../static/img/icon/chongzhi.png"></image>
				<image src="../../../static/img/icon/weizhi.png"></image>
				<input type="text" value="请选择目的地" @click="endadress">
			</div>
			<div class="con">
				
				
				
				
			</div>
		</div>
		
		<view class="uni-title uni-common-pl">地区选择器</view>
        <view class="uni-list">
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">
                    当前选择
                </view>
                <view class="uni-list-cell-db">
                    <picker @change="bindPickerChange" :value="index" :range="array">
                        <view class="uni-input">{{array[index]}}</view>
                    </picker>
                </view>
            </view>
        </view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			startadress(e){
				
			},
			endadress(e){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	#app{
		width: 100%;
		.message{
			width: 690upx;
			height: 234upx;
			background-color: #fff;
			box-shadow: 0 0 6upx .2upx #666;
			margin: 10upx auto;
			display: block;
			padding: 20upx;
			.top{
				display: flex;
				justify-content: space-around;
				align-items: center;
				input{
					color: #333;
					font-size: 26upx;
				}
				image{
					width: 26upx;
					height: 32upx;
					margin-right: 10upx;
				}
				.replace{
					width: 42upx;
					height: 42upx;
				}
			}
		}
	}
	
	
	
	
	
	

</style>
