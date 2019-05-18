<template>
	<view class="content">
		<ul class="tabs">
			<li class="tabsLi" v-for="(statusList,index) in statusList" :key="index" @click="toggleTabs(index)" 
			:class="{active:index!=nowIndex}">
				{{statusList}}
			</li>
		</ul>
		<div class="tabson" v-show="current===0">
			<div class="matter"   v-for="(order,index) in orderList" :key="index">
				<van-row>
					<van-col :span="10">{{order.startCity}}</van-col>
					<van-col :span="4">
						<image src="../../../static/img/icon/chongzhi.png"></image>
					</van-col>
					<van-col :span="10">{{order.endCity}}</van-col>
				</van-row>
				<van-row>
					<van-col :span="6">货物重量:</van-col>
					<van-col :span="6">{{order.cargoWeight}}kg</van-col>
					<van-col :span="6">货物体积: </van-col>
					<van-col :span="6">{{order.cargoVolume}}m3</van-col>
				</van-row>
				<van-row>
					<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
				</van-row>
			</div>
		</div>
		<div class="tabson" v-show="current===1">
			<div class="matter"   v-for="(order,index) in orderList" :key="index">
				<van-row>
					<van-col :span="10">{{order.startCity}}</van-col>
					<van-col :span="4">
						<image src="../../../static/img/icon/chongzhi.png"></image>
					</van-col>
					<van-col :span="10">{{order.endCity}}</van-col>
				</van-row>
				<van-row>
					<van-col :span="6">货物重量:</van-col>
					<van-col :span="6">{{order.cargoWeight}}kg</van-col>
					<van-col :span="6">货物体积: </van-col>
					<van-col :span="6">{{order.cargoVolume}}m3</van-col>
				</van-row>
				<van-row>
					<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
				</van-row>
			</div>
		</div>
		<div class="tabson" v-show="current===2">
			<div class="matter"   v-for="(order,index) in orderList" :key="index">
				<van-row>
					<van-col :span="10">{{order.startCity}}</van-col>
					<van-col :span="4">
						<image src="../../../static/img/icon/chongzhi.png"></image>
					</van-col>
					<van-col :span="10">{{order.endCity}}</van-col>
				</van-row>
				<van-row>
					<van-col :span="6">货物重量:</van-col>
					<van-col :span="6">{{order.cargoWeight}}kg</van-col>
					<van-col :span="6">货物体积: </van-col>
					<van-col :span="6">{{order.cargoVolume}}m3</van-col>
				</van-row>
				<van-row>
					<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
				</van-row>
			</div>
		</div>
		<div class="tabson" v-show="current===3">
			<div class="matter"   v-for="(order,index) in orderList" :key="index">
				<van-row>
					<van-col :span="10">{{order.startCity}}</van-col>
					<van-col :span="4">
						<image src="../../../static/img/icon/chongzhi.png"></image>
					</van-col>
					<van-col :span="10">{{order.endCity}}</van-col>
				</van-row>
				<van-row>
					<van-col :span="6">货物重量:</van-col>
					<van-col :span="6">{{order.cargoWeight}}kg</van-col>
					<van-col :span="6">货物体积: </van-col>
					<van-col :span="6">{{order.cargoVolume}}m3</van-col>
				</van-row>
				<van-row>
					<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
				</van-row>
			</div>
		</div>
		<div class="tabson" v-show="current===4">
			<div class="matter"   v-for="(order,index) in orderList" :key="index">
				<van-row>
					<van-col :span="10">{{order.startCity}}</van-col>
					<van-col :span="4">
						<image src="../../../static/img/icon/chongzhi.png"></image>
					</van-col>
					<van-col :span="10">{{order.endCity}}</van-col>
				</van-row>
				<van-row>
					<van-col :span="6">货物重量:</van-col>
					<van-col :span="6">{{order.cargoWeight}}kg</van-col>
					<van-col :span="6">货物体积: </van-col>
					<van-col :span="6">{{order.cargoVolume}}m3</van-col>
				</van-row>
				<van-row>
					<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
				</van-row>
			</div>
		</div>
		<div class="tabson" v-show="current===5">
			<div class="matter"   v-for="(order,index) in orderList" :key="index">
				<van-row>
					<van-col :span="10">{{order.startCity}}</van-col>
					<van-col :span="4">
						<image src="../../../static/img/icon/chongzhi.png"></image>
					</van-col>
					<van-col :span="10">{{order.endCity}}</van-col>
				</van-row>
				<van-row>
					<van-col :span="6">货物重量:</van-col>
					<van-col :span="6">{{order.cargoWeight}}kg</van-col>
					<van-col :span="6">货物体积: </van-col>
					<van-col :span="6">{{order.cargoVolume}}m3</van-col>
				</van-row>
				<van-row>
					<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
				</van-row>
			</div>
		</div>
			<view class="chooseBotton" v-show="status.current === 0">
				<div class="matter"   v-for="(order,index) in orderList" :key="index">
					<van-row>
						<van-col :span="10">{{order.startCity}}</van-col>
						<van-col :span="4">
							<image src="../../../static/img/icon/chongzhi.png"></image>
						</van-col>
						<van-col :span="10">{{order.endCity}}</van-col>
					</van-row>
					<van-row>
						<van-col :span="6">货物重量:</van-col>
						<van-col :span="6">{{order.cargoWeight}}kg</van-col>
						<van-col :span="6">货物体积: </van-col>
						<van-col :span="6">{{order.cargoVolume}}m3</van-col>
					</van-row>
					<van-row>
						<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
					</van-row>
				</div>
			</view>
			<view class="chooseBotton" v-show="status.current === 1">
				<div class="matter"   v-for="(order,index) in orderList" :key="index">
					<van-row>
						<van-col :span="10">{{order.startCity}}</van-col>
						<van-col :span="4">
							<image src="../../../static/img/icon/chongzhi.png"></image>
						</van-col>
						<van-col :span="10">{{order.endCity}}</van-col>
					</van-row>
					<van-row>
						<van-col :span="6">货物重量:</van-col>
						<van-col :span="6">{{order.cargoWeight}}kg</van-col>
						<van-col :span="6">货物体积: </van-col>
						<van-col :span="6">{{order.cargoVolume}}m3</van-col>
					</van-row>
					<van-row>
						<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
					</van-row>
				</div>
			</view>
			<view class="chooseBotton" v-show="status.current === 2">
				<div class="matter"   v-for="(order,index) in orderList" :key="index">
					<van-row>
						<van-col :span="10">{{order.startCity}}</van-col>
						<van-col :span="4">
							<image src="../../../static/img/icon/chongzhi.png"></image>
						</van-col>
						<van-col :span="10">{{order.endCity}}</van-col>
					</van-row>
					<van-row>
						<van-col :span="6">货物重量:</van-col>
						<van-col :span="6">{{order.cargoWeight}}kg</van-col>
						<van-col :span="6">货物体积: </van-col>
						<van-col :span="6">{{order.cargoVolume}}m3</van-col>
					</van-row>
					<van-row>
						<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
					</van-row>
				</div>
			</view>
			<view class="chooseBotton" v-show="status.current ===3">
				<div class="matter"   v-for="(order,index) in orderList" :key="index">
					<van-row>
						<van-col :span="10">{{order.startCity}}</van-col>
						<van-col :span="4">
							<image src="../../../static/img/icon/chongzhi.png"></image>
						</van-col>
						<van-col :span="10">{{order.endCity}}</van-col>
					</van-row>
					<van-row>
						<van-col :span="6">货物重量:</van-col>
						<van-col :span="6">{{order.cargoWeight}}kg</van-col>
						<van-col :span="6">货物体积: </van-col>
						<van-col :span="6">{{order.cargoVolume}}m3</van-col>
					</van-row>
					<van-row>
						<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
					</van-row>
				</div>
			</view>
			<view class="chooseBotton" v-show="status.current ===4">
				<div class="matter"   v-for="(order,index) in orderList" :key="index">
					<van-row>
						<van-col :span="10">{{order.startCity}}</van-col>
						<van-col :span="4">
							<image src="../../../static/img/icon/chongzhi.png"></image>
						</van-col>
						<van-col :span="10">{{order.endCity}}</van-col>
					</van-row>
					<van-row>
						<van-col :span="6">货物重量:</van-col>
						<van-col :span="6">{{order.cargoWeight}}kg</van-col>
						<van-col :span="6">货物体积: </van-col>
						<van-col :span="6">{{order.cargoVolume}}m3</van-col>
					</van-row>
					<van-row>
						<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
					</van-row>
				</div>
			</view>
			<view class="chooseBotton" v-show="status.current ===5">
				<div class="matter"   v-for="(order,index) in orderList" :key="index">
					<van-row>
						<van-col :span="10">{{order.startCity}}</van-col>
						<van-col :span="4">
							<image src="../../../static/img/icon/chongzhi.png"></image>
						</van-col>
						<van-col :span="10">{{order.endCity}}</van-col>
					</van-row>
					<van-row>
						<van-col :span="6">货物重量:</van-col>
						<van-col :span="6">{{order.cargoWeight}}kg</van-col>
						<van-col :span="6">货物体积: </van-col>
						<van-col :span="6">{{order.cargoVolume}}m3</van-col>
					</van-row>
					<van-row>
						<van-col :span="24">订单号:{{order.orderNumber}}</van-col>
					</van-row>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		mounted() {
			//订单状态( orderStatus ：-1 全部 0 待接单 1 已接单 2 运输中 3 运输完成 4 已完成 )
			let self = this
			self.$request.get({
				url: '/orderLogistics/shipperOrderList/-2',
			}).then(res => {
				console.log(res)
				self.orderList=res.orderList
			})
		},
		data() {
			return {
				// 货物
				orderList:[],
				goods: {
					endCity:'',
					startCity:'',
					orderNumber: '',
					cargoVolume: '',
					cargoWeight: '',
					startCityCode: '',
					endCityCode: ''
				},
				statusList:['全部', '待接单', '已接单', '运输中', '运输完成', '已完成'],
				current:0,
				orderStatus:'',
			}
		},
		methods: {
			toggleTabs(index){
				let self=this
				console.log(index)
				self.orderStatus=index
				self.current=index
				let sourceIndex = index === 0 ? '-2' : index - 1
				self.getOrderList(sourceIndex)
			},
			//订单状态( orderStatus ：null 全部 0 待接单 1 已接单 2 运输中 3 运输完成 4 已完成 )
			chooseStatus(index) {
				let self = this
				self.status.orderStatus = index
				self.status.current = index
				let sourceIndex = index === 0 ? '-2' : index - 1
				self.getOrderList(sourceIndex)
			},
			getOrderList(orderStatus) {
				let self=this
				self.$request.get({
					url: '/orderLogistics/shipperOrderList/' + orderStatus,
				}).then(res => {
					console.log(res)
					self.orderList=res.orderList
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		overflow: hidden;
		.tabs{
			height: 100upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			padding: 0 30upx;
			.tabsLi{
				color: #333;
				font-size: 26upx;
			}
		}
		.tabson{
			background: #fff;
			margin: 6upx 0;
			.matter{
				padding:20upx 30upx;
				border-radius: 20upx;
				margin-bottom: 10upx;
				van-row{
					color: #333;
					font-size: 24upx;
					display: block;
					padding:10upx 0;
					image{
						width: 34upx;
						height: 34upx;
					}
				}
			}
		}
	}
</style>
