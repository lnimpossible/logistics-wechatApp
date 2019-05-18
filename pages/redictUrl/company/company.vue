<template>
	<view class="content" >
		<!-- <div class="mask" :style="displayMask"></div> -->
		<!--公司名称-->
		<header>
			<div class="left">
				<img src="../../../static/img/icon/photo.png" alt="">
			</div>
			<div class="right">
				<h1>{{companyInfor.companyName}}</h1>
				<h2>{{companyInfor.companyAddress}}</h2>
			</div>
		</header>
			<!--公司详细信息-->
		<view class="_tabs">
			<van-row>
				<van-col :span="12">
					<view class="_tab" :class="{'active': active== 0 ? true: false }" @click="this.active = 0">公司信息</view>
				</van-col>
				<van-col :span="12">
					<view class="_tab" :class="{'active': active== 1 ? true: false }" @click="onChange">专线</view>
				</van-col>
			</van-row>
		</view>
		<view class="showInfo_1" :style="{'display': (active == 0) ? 'block' : 'none'}">
			<ul>
				<li>
					<div class="top"><van-icon name="stop" color="#387ec3" />公司简介</div>
					<p class="companyIntroInput">{{companyInfor.intro || '暂无'}}</p>
				</li>
				<li>
					<div class="top"><van-icon name="stop" color="#387ec3" />联系人</div>
					<div class="con">
						<h1>
							<h2>{{companyInfor.linkman}}</h2>
							<h3>负责人</h3>
							<h4>{{companyInfor.telephone}}</h4>
							<van-button size="mini" type="primary" @click="makePhoneCall"><van-icon name="phone" color="#fff" size="22px" /></van-button>
						</h1>
					</div>
				</li>
				<li>
					<div class="top"><van-icon name="stop" color="#387ec3" />相册</div>
					<div class="under">
						<image mode="aspectFill" :src="companyInfor.licencePicture" alt=""></image>
					</div>
				</li>
			</ul>
		</view>
		<view class="showInfo_2" :style="{'display': (active == 1) ? 'block' : 'none'}">
			<view>
				<view class="LineItem" v-for="(item, index) in companyLines" :key="index">
					<van-row>
						<van-col :span="8" style="text-align: center;">
							<image style="width:30upx;height:40upx;" mode="aspectFit" src="../../../static/img/icon/zhuang.png" alt=""></image>
							<span>{{item.originNodeName}}</span>
						</van-col>
						<van-col :span="4">
							<image style="width:100%;height:40upx;" mode="aspectFit" src="../../../static/img/icon/line.png" alt=""></image>
						</van-col>
						<van-col :span="8" style="text-align: center;">
							<image style="width:30upx;height:40upx;" mode="aspectFit" src="../../../static/img/icon/xie.png" alt=""></image>
							<span>{{item.destinationNodeName}}</span>
						</van-col>
					</van-row>
					<van-row>
						<van-col :span="8">
							<span>车型 {{item.vehicleType}}</span>
						</van-col>
						<van-col :span="8">
							<span>重货：￥{{item.heavyCargoFreightRate}}/m³</span>
						</van-col>
						<van-col :span="8">
							<span>轻货：￥{{item.lightCargoFreightRate}}/m³</span>
						</van-col>
					</van-row>
					<van-row>
					</van-row>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		mounted(){
			let self = this
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]
			const options = currentPage.options
			this.$request.post({
				url: '/company/info',
				data: {
				  "compId": options.compId || '80'
				}
			}).then(res => {
				self.companyInfor = res.companyInfo
			})
		},
		data(){
			return{
				companyInfor:{
					companyName: "",
					intro: "",
					licencePicture: "",
					linkman: "",
					creditCode: "",
					telephone: ""
				},
				companyLines: [],
				hasLineFlag: true,
				displayMask: 'display:none',
				active: 0,
				show: true
			}
		},
		methods:{
			makePhoneCall(phone){
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			onChange(event) {
				let self = this
				self.active = 1
				self.$request.post({
					url: '/logistics/driverDirectLine/ownerQuery',
					data:{
						"currPage": "1",
						"pageSize": "100"
					}
				}).then(res => {
					self.companyLines = res.page.list
				})
			},
		},
	};
</script>
<style lang="scss" scoped>
	.mask{
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(255,255,255,1);
		z-index: 2;
	}
	._tabs{
		height: 70upx;
		line-height: 70upx;
		margin-bottom: 15upx;
		._tab{
			border:1upx solid #fff;
			background: skyblue;
			text-align: center;
			color: #fff;
		}
		._tab.active{
			border-bottom: none;
			background: #fff;
			color: #000;
		}
	}
	header{
		padding: 20upx;
		display: flex;
		.left{
			margin-right: 26upx;
			img{
				width: 120upx;
				height: 120upx;
			}
		}
		.right{
			h1{
				font-size: 35upx;
				color: #333;
				margin-bottom: 20upx;
			}
			h2{
				font-size: 25upx;
				color: #333;
			}
		}
	}
	.showInfo_1 ul{
		width: 96%;
		margin: 0 auto;
		background: #fff;
		li{
			.under{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}
			.top{
				height: 60upx;
				line-height: 60upx;
				width: 100%;
				font-size: 24upx;
				color: #333;
				border-bottom:1upx solid #eee;
			}
			.companyIntroInput{
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp:3;
				-webkit-box-orient:vertical;
				color: #666;
				font-size: 22upx;
				line-height: 38upx;
			}
			.con{
				h1{
					height: 70upx;
					display: flex;
					line-height: 70upx;
					
				}
				h2{
					font-size: 24upx;
					color: #333;
					margin-right: 16upx;
				}
				h3{
					color: #999;
					font-size: 20upx;
					margin-right: 250upx;
				}
				h4{
					font-size: 24upx;
					color: #333;
					margin-right: 40upx;
				}
			} 
		}
	}

	.showInfo_2{
		.LineItem{
			width: 96%;
			margin: 0 auto;
			background: #fff;
			font-size: 30upx;
			padding: 25upx 0;
			margin-bottom: 10upx;
		}
	}



</style>
