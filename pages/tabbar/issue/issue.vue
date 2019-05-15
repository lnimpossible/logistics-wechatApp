<template>
	<view class="content">
		<div class="address">
			<div class="top">
				<h1>*装货地</h1>
				<picker mode="region" @change="chooseStartAddress" >
					<view class="picker">{{address.start || '选择省|市|区'}}</view>
				</picker>
				<input type="text" placeholder="填写详细地址可帮您更快的找到司机">
			</div>
			<div class="con">
				<h2>装货时间</h2>
				<picker mode="region" @change="chooseStartTime" >
					<view class="picker">{{times.start || '请选择'}}</view>
				</picker>
			</div>
			<div class="top">
				<h1>*卸货地</h1>
				<picker mode="region" @change="chooseEndAddress" >
					<view class="picker">{{address.end || '选择省|市|区'}}</view>
				</picker>
				<input type="text" placeholder="填写详细地址可帮您更快的找到司机">
			</div>
			<div class="con">
				<h2>卸货时间</h2>
				<picker mode="region" @change="chooseEndTime" >
					<view class="picker">{{times.end || '请选择'}}</view>
				</picker>
			</div>
		</div>
		<div class="message">
			<picker mode="region" @change="chooseCart" >
				<view class="picker">{{carts || '请选择车型'}}</view>
			</picker>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carts:'',
				times:{
					start:'',
					end:''
				},
				address:{
					start:'',
					end:''
				}
			}
		},
		onLoad() {

		},
		methods: {
			chooseEndTime(e){
				
			},
			chooseEndAddress(e){
				let self = this
				let address = e.detail.value
				self.address.end = address[1]
			},
			// 选择开始时间
			chooseStartTime(e){
				
			},
			//选择开始地址
			chooseStartAddress(e){
				let self = this
				let address = e.detail.value
				self.address.start = address[1]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f2f2f2;
		.address{
			background-color: #fff;
			width: 100%;
			.top{
				width: 100%;
				
			}
		}
			
	}
</style>
