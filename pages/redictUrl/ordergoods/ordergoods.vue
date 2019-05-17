<template>
	<view class="content">
		<uni-segmented-control :current="status.current" :values="status.items" @clickItem="chooseStatus" style-type="button" active-color="#007aff"></uni-segmented-control>
		<view class="chooseBottonDad">
			<view class="chooseBotton" v-show="current === 0">
				<div class="matter">
					<van-row>
						<van-col :span="10">{{goods.startCityCode}}</van-col>
						<van-col :span="4"><image src="../../../static/img/icon/chongzhi.png"></image></van-col>
						<van-col :span="10">{{goods.endCityCode}}</van-col>
					</van-row>
					<van-row>
						<van-col :span="12">货物重量{{goods.cargoWeight}}</van-col>
						<van-col :span="12">货物体积{{goods.cargoVolume}}</van-col>
					</van-row>
				</div>	
			</view>
			<view  class="chooseBotton" v-show="current === 1">
				<div class="matter">
					<van-row>
						<van-col :span="10">{{goods.startCityCode}}</van-col>
						<van-col :span="4"><image src="../../../static/img/icon/chongzhi.png"></image></van-col>
						<van-col :span="10">{{goods.endCityCode}}</van-col>
					</van-row>
					<van-row>
						<van-col :span="12">货物重量{{goods.cargoWeight}}</van-col>
						<van-col :span="12">货物体积{{goods.cargoVolume}}</van-col>
					</van-row>
				</div>	
			</view>
			<view  class="chooseBotton" v-show="current === 2">
				选项卡3的内容
			</view>
			<view  class="chooseBotton" v-show="current ===3">
				
			</view>
			<view  class="chooseBotton" v-show="current ===4">
				
			</view>
			<view  class="chooseBotton" v-show="current ===5">
				
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		components: {
			uniSegmentedControl
		},
		mounted(){
			//订单状态( orderStatus ：null 全部 0 待接单 1 已接单 2 运输中 3 运输完成 4 已完成 )
			let self=this
			let oderStatus=self.status.orderStatus
			self.$request.post({
				url:'/orderLogistics/shipperorderlist/' + orderStatus,
			}).then(res=>{
				
			})
		},
		data() {
			return {
				// 货源
				goods:{
					cargoVolume:'',
					cargoWeight:'',
					startCityCode:'',
					endCityCode:''
				},
				// 状态
				status:{
					items: ['全部', '待接单', '已接单','运输中','运输完成','已完成'],
					current: 0,
					orderStatus:''
				}
				
			}
		},
		methods: {
			chooseStatus(e) {
				console.log(e)
				let self=this
				switch(e){
					case 0:
						self.orderStatus=e
						break;
					case 1:
						self.orderStatus=e
						break;
					case 2:
						self.orderStatus=e
						break;
					case 3:
						self.orderStatus=e
						break;
					case 4:
						self.orderStatus=e
						break;
					case 5:
						self.orderStatus=e
						break;
				}
				console.log(self.current)
				// if (self.current !== index) {
				// 	this.current = index;
				// }
				// if(index == 0){
				// 	this.getOrderList(null);
				// } else if (index == 2) {
				// 	this.getOrderList(1);
				// }
			},
			//订单状态( orderStatus ：null 全部 0 待接单 1 已接单 2 运输中 3 运输完成 4 已完成 )
			// getOrderList(orderStatus) {
			// 	self.$request.post({
			// 		url: 'orderLogistics/shipperorderlist/' + orderStatus,
			// 	}).then(res => {})
			// }

		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		.chooseBottonDad{
			width: 750upx;
			.chooseBotton{
				width: 60upx;
				height: 30upx;
				padding:0 30upx;
				.matter{
					width:"100%";
					background-color: #fff;
				}
			}
			
		}
	}
	


</style>
