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
		<uni-popup :show="poputs" position="middle" mode="fixed" msg="车辆匹配成功">
			<button type="primary" @click="nosatisfaction">取消</button>
			<button type="primary" @click="satisfaction">邀请</button>
		</uni-popup>
		<div class="wait" :style="styles">
			<h1>正在拼命匹配中 ...</h1>
			<cmd-progress percent="100" status="active" :show-info="false" stroke-width="15"></cmd-progress>
			<button type="default" @click="cancellation"  >取消订单</button>
		</div>
	</view>
</template>

<script>
	import {uniPopup} from "@/components/uni-popup/uni-popup.vue"
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	export default {
		components:{
			uniPopup,
			cmdProgress
		},
		mounted(){
			let self=this
			self.nowTimes()
		},
		data() {
			return {
				orderNumber: '',
				show:false,
				styles:'display:none',
				schedule:'80',
				poputs:false,
				nowTime:'',
				orderType:'2',
				goodsCommentData:'',
				goodsBulkData:'',
				goodsWeightData:'',
				goodsDescriptionData:'',
				address:{
					start:'',
					end:'',
					startLongitude:'120.583190',
					startLatitude:'31.298340',
					endLongitude:'121.473700', 
					endLatitude:'31.230370'
					},
				chooseStartAddressData:''
			};
		},
		methods:{
			// 货主点击取消订单
			cancellation(e){
				let self=this
				self.styles="display:none"
				self.$request.get({
					url:`/orderLogistics/cancelorder/${ordernumber}`
				})
			},
			// 货主单击弹出层邀请
			satisfaction(e){
				uni.navigateTo({
					url:'../cartlist/cartlist'
				})
			},
			// 货主单击弹出层取消
			nosatisfaction(e){
				let self=this
				self.poputs=false
			},
			// 获取当前时间
			timeFormate(timeStamp) {
				let self=this
			    let year = new Date(timeStamp).getFullYear();
			    let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
			    let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
			    let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
			    let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
			    let ss=new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
			    self.nowTime =year+"-"+month+"-"+date+" "+hh+":"+mm+":"+ss;
			},
			//定时器
			nowTimes(){
				let self=this
				self.timeFormate(new Date());
				setInterval(self.nowTimes,30*1000);
			},
			//单击确定按钮
			submitMessage(e){
				let self=this
				let p=self.$request.post({
					url:"/orderLogistics/add",
					data:{
						cargoName:self.goodsDescriptionData,
						cargoVolume:self.goodsBulkData,
						cargoWeight:self.goodsWeightData,
						remark:self.goodsCommentData,
						startLongitude:self.address.startLongitude,
						startLatitude:self.address.startLatitude,
						endLongitude:self.address.endLongitude,
						endLatitude:self.address.endLatitude,
						orderType:'2',
						loadDate:self.nowTime
					}
				})
				p.then(res=>{
					console.log(res)
					let self=this
					// self.orderNumber = res.
					if(res.matchOrderBeans && res.matchOrderBeans.length > 0){
						console.log(res.matchOrderBeans)
						self.styles="display:block"
					}else{
						uni.showToast({
							title: '没有匹配到车辆,请稍后重试',
							icon: 'none',
							duration: 2500
						})
					}
					
					
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
				margin: 24upx 0;
				font-size: 24upx;
				input{
					border-bottom: #afafaf 1upx solid;
					margin-right: 20upx;
				}
			}
			button{
				width: 320upx;
				height: 70upx;
				line-height: 70upx;
				border-radius: 50upx;
				
			}
		}
		.wait{
			width: 690upx;
			height: 300upx;
			back: #fff;
			position:fixed;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			z-index: 22;
			box-shadow: 0 0 6upx .2upx #666;
			padding: 30upx 40upx 0;
			h1{
				font-size: 34upx;
				color: #333;
				text-align: center;
				margin-bottom: 10upx;
			}
			button{
				height: 120upx;
				width: 100%;
				position: fixed;
				bottom: 0;
				left: 0;
			}
		}
	}
</style>
