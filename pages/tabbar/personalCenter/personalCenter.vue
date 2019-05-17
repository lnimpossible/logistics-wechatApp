<template>
	<view>
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo">
				<view class="face">
					<!-- <image :src="userinfo.face"></image> -->
					<open-data type="userAvatarUrl"></open-data>
				</view>
				<view class="info">
					<view class="username">
					<!-- {{userinfo.username}} -->
						<open-data type="userNickName"></open-data>
					</view>
					<view class="integral">积分:{{userinfo.integral || 0}}</view>
				</view>
			</view>
			<view class="setting"><image src="../../../static/HM-PersonalCenter/setting.png"></image></view>
		</view>
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(row,index) in orderTypeLise" :key="row.name" hover-class="hover"  @tap="toOrderType(index)">
					<view class="icon"><view class="badge" v-if="row.badge>0">{{row.badge}}</view><image :src="'../../../static/HM-PersonalCenter/'+row.icon"></image></view>
					{{row.name}}
				</view>
			</view>
		</view> 
		<view class="list" v-for="(list,list_i) in severList" :key="list_i">
			<view class="li" v-for="(li,li_i) in list" @tap="toPage(list_i,li_i)"  hover-class="hover" :key="li.name" >
				<view class="icon"><image :src="'../../../static/HM-PersonalCenter/sever/'+li.icon"></image></view>
				<view class="text">{{li.name}}</view>
				<image class="to" src="../../../static/HM-PersonalCenter/to.png"></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				//#ifndef APP-PLUS
				isH5Plus:false,
				//#endif
				userinfo:{},
				orderTypeLise:[
					//name-标题 icon-图标 badge-角标
					{name:'我的订单',icon:'l1.png',badge:0},
					{name:'常发货源',icon:'l2.png',badge:0},
					{name:'运输中',icon:'l3.png',badge:0},
					{name:'待评价',icon:'l4.png',badge:0},
					{name:'意见反馈',icon:'l5.png',badge:0}
				],
				severList:[
					[
						// {name:'我的货源',icon:'point.png'},
						// {name:'意见反馈',icon:'kefu.png'},
						{name:'在线客服',icon:'kefu.png'}
						// {name:'设置',icon:'addr.png'}
						// {name:'优惠券',icon:'quan.png'},
						// {name:'红包',icon:'momey.png'}
						// {name:'任务',icon:'renw.png'},
					],
					[
						// {name:'积分明细',icon:'mingxi.png'},
						// {name:'抽奖',icon:'choujiang.png'},
						// {name:'收货地址',icon:'addr.png'},
						// {name:'银行卡',icon:'bank.png'},
						// {name:'安全中心',icon:'security.png'},
					]
				],
			};
		},
		onLoad() {
			//加载
			this.init();
		},
		methods: {
			init() {
				//用户信息
				let self = this
				let personalInfo = self.$log.get('personalInfo')
				if(personalInfo){
					self.userinfo = personalInfo
				}else{
					wx.login({
						success (loginRes) {
						  console.log(loginRes)
						  // self.code = loginRes.code
						  // 查看是否授权
							wx.getSetting({
							  success(res) {
								if (res.authSetting['scope.userInfo']) {
								  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
								  wx.getUserInfo({
									success(res) {
									  console.log(res.userInfo)
									}
								  })
								}
							  }
							})
						  }
						 //  self.$request.get({
							// 	url: '/user/getUserLoginInfo'
							// }).then(res => {
							// 	self.userinfo = {
							// 		face:'../../../static/HM-PersonalCenter/face.jpeg',
							// 		username:"VIP会员10240",
							// 		integral:"1435"
							// 	}
							// 	self.$log.set('personalInfo',res.loginInfo)
							// })
						// }
					})
					
				}
					
				
			},
			//用户点击订单类型
			toOrderType(index){
				console.log(index)
				// uni.showToast({title: this.orderTypeLise[index].name});
				switch (index){
					case 0:
						break;
					case 1:
						uni.navigateTo({
							url: '../../redictUrl/dailySOD/dailySOD'
						})
						break;
					case 2:
						break;
					default:
						break;
				}
				
			},
			//用户点击列表项
			toPage(list_i,li_i){
				uni.showToast({title: this.severList[list_i][li_i].name});
			}
		}
	}
</script>

<style lang="scss" scoped>
.header{
	&.status{padding-top:var(--status-bar-height);}
	// background-color:#ff6364;
	// background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
	background: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
	width:92%;height:25vw;padding:0 4%;display:flex;align-items:center;
	.userinfo{
		width:90%;display:flex;
		.face{flex-shrink:0;width:15vw;height:15vw;
			image{width:100%;height:100%;border-radius:100%}
		}
		.info{
			display:flex;flex-flow:wrap;padding-left:30upx;
			.username{width:100%;color:#fff;font-size:40upx}
			.integral{display:flex;align-items:center;padding:0 20upx;height:40upx;color:#fff;background-color:rgba(0,0,0,0.1);border-radius:20upx;font-size:24upx}
		}
	}
	.setting{
		flex-shrink:0;width:6vw;height:6vw;
		image{width:100%;height:100%}
	}
}
.hover{background-color:#fefefe}
.orders{
	// background-color:#ff6364;
	// background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
	background: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
	width:92%;height:11vw;padding:0 4%;margin-bottom:calc(11vw + 40upx);display:flex;align-items:flex-start;border-radius:0 0 100% 100%;margin-top: -1upx;
	.box{
		width:98%;padding:0 1%;height:22vw;background-color:#fefefe;border-radius:24upx;box-shadow:0 0 20upx rgba(0,0,0,0.15);margin-bottom:40upx;display:flex;align-items:center;justify-content:center;
		.label{
			display:flex;align-items:center;justify-content:center;flex-flow:wrap;width:100%;height:16vw;color:#666666;font-size:26upx;
			.icon{
				position:relative;width:7vw;height:7vw;margin:0 1vw;
				.badge{position:absolute;width:4vw;height:4vw;background-color:#ec6d2c;top:-1vw;right:-1vw;border-radius:100%;font-size:20upx;color:#fff;display:flex;align-items:center;justify-content:center;z-index: 10;}
				image{width:7vw;height:7vw;z-index: 9;}
			}
		}
	}
}
.list{
	width:96%;
	margin: 0 auto;
	background: #fff;
	.li{
		width:92%;height:100upx;padding:0 4%;border-bottom:solid 1upx #e7e7e7;display:flex;align-items:center;
	&.noborder{border-bottom:0}
		.icon{
			flex-shrink:0;width:50upx;height:50upx;
			image{width:50upx;height:50upx}
		}
		.text{padding-left:20upx;width:100%;color:#666}
		.to{flex-shrink:0;width:40upx;height:40upx}
	}
}
</style>
