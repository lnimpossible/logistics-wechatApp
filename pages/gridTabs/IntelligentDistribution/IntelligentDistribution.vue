<template>
	<view id="app">
		<div class="message">
			<div class="top">
				<image src="../../../static/img/icon/weizhi.png"></image>
				<picker mode="region" @change="chooseStartAddress" >
					<view class="picker">{{address.start || '请输入起始地'}}</view>
					<!-- <input type="text" :value="address.start" placeholder="请输入起始地" disabled /> -->
				</picker>
				
				<image class="replace" src="../../../static/img/icon/chongzhi.png"></image>
				<image src="../../../static/img/icon/weizhi.png"></image>
				<picker mode="region" @change="chooseEndAddress">
					<view class="picker">{{address.end ||'请输入目的地'}}</view>
				</picker>
			</div>
			<div class="con">
				<input type="text" :value="goodsDescriptionData" placeholder="货物名称" placeholder-style="color:#afafaf" @change="goodsDescription" />
				<input type="number" :value="goodsWeightData" placeholder="kg" placeholder-style="color:#afafaf" @change="goodsWeight"/>
				<input type="number" :value="goodsBulkData" placeholder="m3" placeholder-style="color:#afafaf" @change="goodsBulk" />
				<input type="text" :value="goodsCommentData" placeholder="备注" placeholder-style="color:#afafaf" @change="goodsComment"/>
			</div>
			<button type="primary" @click="submitMessage">确定</button>
		</div>
		
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderType:'2',
				goodsCommentData:'',
				goodsBulkData:'',
				goodsWeightData:'',
				goodsDescriptionData:'',
				address:{
					start:'',
					end:'',
					startLongitude:'117.20',
					startLatitude:'39.12',
					endLongitude:'120.58', 
					endLatitude:'31.30'
					},
				chooseStartAddressData:''
			};
		},
		methods:{
			submitMessage(e){
				let self=this
				let p=self.$request.post({
					url:"/orderLogistics/add",
					data:{
						cargoName:self.goodsDescriptionData,
						cargoVolume:self.goodsBulkData,
						cargoWeight:self.goodsWeightData,
						remark:self.goodsCommentData,
						startLongitude:self.startLongitude,
						startLatitude:self.startLatitude,
						endLongitude:self.endLongitude,
						endLatitude:self.endLatitude,
						orderType:'2'
					}
				})
				p.then(res=>{
					console.log(res)
				})
			},
			goodsComment(e){
				let self=this
				self.goodsCommentData=e.detail.value
			},
			goodsBulk(e){
				let self=this
				self.goodsBulkData=e.detail.value
			},
			goodsWeight(e){
				let self=this
				self.goodsWeightData=e.detail.value
			},
			goodsDescription(e){
				let self=this
				self.goodsDescriptionData=e.detail.value
			},
			chooseStartAddress(e){
				let self = this
				let address = e.detail.value
				self.address.start = address[1]
			},
			chooseEndAddress(e){
				let self=this
				let address=e.detail.value
				self.address.end=address[1]
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
				picker{
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
			.con{
				display: flex;
			}
		}
	}
	
	
	
	
	
	

</style>
