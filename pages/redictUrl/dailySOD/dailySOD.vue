<template>
	<view class="content">
		<PageTitle :title='currentTitle'></PageTitle>
		<!-- 专线列表 -->
		<div class="cardList">
			<div class="cardItem" v-for="(item,index) in cagoList" :key="index">
				<van-card
					:desc="item.intro"
					:title="item.compName"
				>
					<view slot="tags">
						<van-row style="margin: 5px 0 10px 0;">
							<van-col :span="7"><div style="text-align:left;font-size: 14px;">{{item.startCity}} </div></van-col>
							<van-col :span="3"><div style="text-align:center;font-size: 14px;"><van-icon custom-style="padding-top:0x;" name="exchange" /> </div></van-col>
							<van-col :span="7"><div style="text-align:right;font-size: 14px;">{{item.endCity}}  </div></van-col>
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
							<van-col :span="8"><van-button size="mini" type="info" @click="makePhoneCall(item.compTelephone)"><van-icon name="phone" color="#fff" size="18px" /></van-button></van-col>
						</van-row>
					</view>
				</van-card>
			</div>
		</div>
	</view>
</template>

<script>
	import PageTitle from '@/components/pageTitle.vue'
	export default {
		components: {
			PageTitle
		},
		mounted(){
			let self = this
			let location = self.$log.get('location')
			self.$request.post({
				url: '/logistics/shipperGoodsReleased/cargoQuery',
				data:{
				  "currPage": 1,
				  "latitude": location.latitude,
				  "longitude": location.longitude,
				  "pageSize": 30
				}
			}).then(res => {
				self.cagoList = res.page.list
			})
		},
		data() {
			return {
				cagoList:[1,2],
				currentTitle: '常发货源'
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
