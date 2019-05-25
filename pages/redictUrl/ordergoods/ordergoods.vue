<template>
	<view class="content">
		<ul class="tabs">
			<li class="tabsLi" 
				:class="{'active': current == index ? true : false}" 
				v-for="(statusList,index) in statusList" 
				:key="index" @click="toggleTabs(index)">
				{{statusList}}
			</li>
		</ul>
		<div class="tabson">
			<div class="matter" v-for="(order,index) in orderList" :key="index">
				<div class="orderStatus" v-if='current == 0'>{{orderStatusZH(order)}}</div>
				<div class="orderStatus" v-if='current == 1' @tap='cancelOrder(order.orderNumber)'>取消订单</div>
				<div class="orderStatus" v-if='current == 5' @tap='deleteorder(order.orderNumber)'>删除订单</div>
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
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more'
	export default {
		components:{
			uniLoadMore
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			console.log('刷新数据')
			this.currPage = 1
			this.getCurrentReleased()
			uni.stopPullDownRefresh()
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			this.getMore()
		},
		mounted() {
			//订单状态( orderStatus ：-1 全部 0 待接单 1 已接单 2 运输中 3 运输完成 4 已完成 )
			let self = this
			self.$request.post({
				url: '/orderLogistics/shipperOrderList',
				data: {
				  "currPage": 1,
				  "orderStatus": -2,
				  "pageSize": self.pageSize
				}
			}).then(res => {
				if(res.orderList.list.length < self.pageSize){
					self.loading.status = "noMore"
				}
				self.orderList=res.orderList.list
			})
		},
		data() {
			return {
				loading:{
					status: 'more'
				},
				currPage: 1,
				pageSize: 10,
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
				orderStatus:''
			}
		},
		methods: {
			getMore(){
				let self = this
				self.loading.status = 'loading'
				this.getCurrentReleased()
			},
			getCurrentReleased(){
				let self = this
				let orderStatus = self.orderStatus
				self.$request.post({
					url: '/logistics/shipperGoodsReleased/cargoQuery',
					data:{
					  "currPage": self.currPage,
					  "orderStatus": orderStatus,
					  "pageSize": self.pageSize
					}
				}).then(res => {
					if(self.currPage === 1){
						self.orderList=res.orderList.list
					}else{
						self.orderList = [...self.orderList,...res.orderList.list]
					}
					self.currPage++
					if(res.orderList.list.length < self.pageSize){
						self.loading.status = "noMore"
					}else{
						console.log('more')
						self.loading.status = "more"
					}
				})
			},
			//取消订单
			cancelOrder(orderNumber){
				this.$request.Delete({
					url: `/orderLogistics/shipperCancelOrder/${orderNumber}`
				}).then(res => {
					this.toggleTabs(1)
				})
			},
			deleteorder(orderNumber){
				this.$request.Delete({
					url: `/orderLogistics/shipperDelectOrder/${orderNumber}`
				}).then(res => {
					this.toggleTabs(1)
				})
			},
			toggleTabs(index){
				let self=this
				self.orderList = []
				uni.showLoading({
					title: '正在加载中',
					mask: false
				});
				self.current=index
				let sourceIndex = index === 0 ? '-2' : index - 1
				self.orderStatus=sourceIndex
				self.getOrderList(sourceIndex)
			},
			
			orderStatusZH(order){
				switch(order.orderStatus){
					case '-1':
						return '已取消';
						break;
					case '0':
						return '待接单';
						break;
					case '1':
						return '已接单';
						break;
					case '2':
						return '运输中';
						break;
					case '3':
						return '运输完成';
						break;
					case '4':return '已完成';
						break;
				}
			},
			getOrderList(orderStatus) {
				let self=this
				self.$request.post({
					url: '/orderLogistics/shipperOrderList',
					data: {
					  "currPage": 1,
					  "orderStatus": orderStatus,
					  "pageSize": 10
					}
				}).then(res => {
					self.orderList=res.orderList.list
				})
				uni.hideLoading()
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
			.tabsLi.active{
				color: red;
			}
		}
		.tabson{
			margin: 6upx 0;
			.matter{
				padding:20upx 30upx;
				border-radius: 20upx;
				background: #fff;
				margin-bottom: 10upx;
				position: relative;
				.orderStatus{
					position: absolute;
					top: 20upx;
					right: 20upx;
					background: #fff;
					color: orangered;
					border: 1upx solid orangered;
					font-size: 30upx;
					padding: 5upx 10upx;
				}
				.cancelOrder{
					position: absolute;
					bottom: 15upx;
					right: 20upx;
					background: #fff;
					color: orangered;
					border: 1upx solid orangered;
					font-size: 30upx;
					padding: 5upx 10upx;
				},
				van-row{
					color: #333;
					font-size: 24upx;
					display: block;
					// padding:10upx 0;
					image{
						width: 34upx;
						height: 34upx;
					}
				}
			}
		}
	}
</style>
