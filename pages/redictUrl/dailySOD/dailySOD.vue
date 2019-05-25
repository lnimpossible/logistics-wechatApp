<template>
	<view class="content">
		<!-- 专线列表 -->
		<div class="cardList">
			<div class="cardItem" v-for="(item,index) in cagoList" :key="index" @tap='upload(item.id)' >
				<van-card
					:desc="item.intro || ''"
					:title="item.compName|| ''"
				>
					<view slot="tags">
						<van-row style="margin: 5px 0 10px 0;">
							<van-col :span="7"><div style="text-align:center;font-size: 14px;">{{item.startCity || ''}} </div></van-col>
							<van-col :span="5">
								<image style="width: 100%;height: 20upx;" mode="aspectFit" src="../../../static/img/icon/jiantou3x.png"></image>
							</van-col>
							<van-col :span="7"><div style="text-align:right;font-size: 14px;">{{item.endCity || ''}}  </div></van-col>
						</van-row>
					</view>
					<view slot="tags">
						<van-row>
							<van-col :span="8" style="text-align:center;"> {{item.vehicleType || '暂无车型信息'}} 千克 </van-col>
							<van-col :span="8" style="text-align:center;"> {{item.cargoWeight || 0}} 千克 </van-col>
							<van-col :span="8" style="text-align:center;"> {{item.vargoVolume || 0}} m³ </van-col>
						</van-row>
					</view>
					<!-- <view slot="tags">
						<van-row>
							<van-col :span="16"><div class="price">体积 {{item.vargoVolume || 0}} m³ </div></van-col>
						</van-row>
					</view> -->
				</van-card>
			</div>
			<uni-load-more :status="loading.status"></uni-load-more>
		</div>
	</view>
</template>

<script>
	//1引入组件 uni-load-more.vue
	import uniLoadMore from '@/components/uni-load-more/uni-load-more'
	export default {
		components:{
			uniLoadMore
		},
		onShow() {
			this.currPage = 1
			this.getShipperGoodsReleased()
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			console.log('刷新数据')
			this.cagoList = []
			this.currPage = 1
			this.getShipperGoodsReleased()
			uni.stopPullDownRefresh()
			// this.getnewsList();
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			this.getMore()
		},
		methods:{
			getMore(){
				let self = this
				self.loading.status = 'loading'
				this.getShipperGoodsReleased()
			},
			getShipperGoodsReleased(){
				let self = this
				let location = self.$log.get('location')
				self.$request.post({
					url: '/logistics/shipperGoodsReleased/cargoQuery',
					data:{
					  "currPage": self.currPage,
					  "latitude": location.latitude,
					  "longitude": location.longitude,
					  "pageSize": self.pageSize,
					  "status": "0",
					  "isRegularCargoOrigin":"1"
					}
				}).then(res => {
					if(self.currPage === 1){
						self.cagoList = res.page.list
					}else{
						self.cagoList = [...self.cagoList,...res.page.list]
					}
					self.currPage++
					if(res.page.list.length < self.pageSize){
						self.loading.status = "noMore"
					}else{
						console.log('more')
						self.loading.status = "more"
					}
				})
			},
			upload(id){
				uni.navigateTo({
					url: '/pages/redictUrl/dailySOD/upissue/upissue?id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		data() {
			return {
				loading:{
					status: 'more'
				},
				cagoList:[1,2],
				currentTitle: '常发货源',
				currPage: 1,
				pageSize: 15
			};
		}
	}
</script>

<style lang="scss" scoped>
.content{
	background: #fff;
	.cardList{
		width: 96%;
		margin: 0 auto;
		.cardItem{
			margin: 15upx 0;
			border-radius: 22upx;
			overflow: hidden;
			position: relative;
		}
	}
}
</style>
