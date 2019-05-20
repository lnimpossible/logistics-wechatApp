<template>
	<view class="content">
		<!-- 专线列表 -->
		<div class="cardList">
			<div class="cardItem" v-for="(item,index) in cagoList" :key="index">
				<van-card
					:desc="item.intro || ''"
					:title="item.compName|| ''"
				>
					<view slot="tags">
						<van-row style="margin: 5px 0 10px 0;">
							<van-col :span="7"><div style="text-align:left;font-size: 14px;">{{item.startCity || ''}} </div></van-col>
							<van-col :span="3"><div style="text-align:center;font-size: 14px;"><van-icon custom-style="padding-top:0x;" name="exchange" /> </div></van-col>
							<van-col :span="7"><div style="text-align:right;font-size: 14px;">{{item.endCity || ''}}  </div></van-col>
						</van-row>
					</view>
					<view slot="tags">
						<van-row>
							<van-col :span="16"><div class="price">重量 {{item.cargoWeight || 0}} 千克 </div></van-col>
						</van-row>
					</view>
					<view slot="tags">
						<van-row>
							<van-col :span="16"><div class="price">体积 {{item.vargoVolume || 0}} m³ </div></van-col>
							<!-- <van-col :span="8"><van-button size="mini" type="info" @click="makePhoneCall(item.compTelephone)"><van-icon name="phone" color="#fff" size="18px" /></van-button></van-col> -->
						</van-row>
					</view>
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
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			console.log('刷新数据')
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
					  "pageSize": self.pageSize
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
			}
		},
		mounted(){
			this.getShipperGoodsReleased()
		},
		data() {
			return {
				loading:{
					status: 'more'
				},
				cagoList:[1,2],
				currentTitle: '常发货源',
				currPage: 1,
				pageSize: 10
			};
		}
	}
</script>

<style lang="scss" scoped>
.content{
	.cardList{
		width: 96%;
		margin: 0 auto;
		.cardItem{
			margin: 10upx 0;
		}
	}
}
</style>
