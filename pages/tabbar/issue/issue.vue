<template>
	<view class="content">
		<div class="address">
			<div class="top">
				<van-row>
					<van-col :span="12">*装货地</van-col>
					<van-col :span="12"><view class="picker">{{address.start || '选择省|市|区'}}</view></van-col>
				</van-row>
				<van-row>
					<van-col :span="24">
						<input type="text" placeholder="填写详细地址可帮您更快的找到司机">
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="12">装货时间</van-col>
					<van-col :span="12">
						<picker mode="region" @change="chooseStartTime" >
							<view class="picker">{{times.start || '请选择'}}</view>
						</picker>
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="12">*卸货地</van-col>
					<van-col :span="12"><view class="picker">{{address.start || '选择省|市|区'}}</view></van-col>
				</van-row>
				<van-row>
					<van-col :span="24">
						<input type="text" placeholder="填写详细地址可帮您更快的找到司机">
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="12">装货时间</van-col>
					<van-col :span="12">
						<picker mode="region" @change="chooseStartTime" >
							<view class="picker">{{times.start || '请选择'}}</view>
						</picker>
					</van-col>
				</van-row>
			</div>
			<div class="baseInfor">基础信息</div>
			<!-- <div class="con">
				<h2>装货时间</h2>
				<picker mode="region" @change="chooseStartTime" >
					<view class="picker">{{times.start || '请选择'}}</view>
				</picker>
			</div> -->
			<!-- <div class="top">
				<h1>*卸货地</h1>
				<picker mode="region" @change="chooseEndAddress" >
					<view class="picker">{{address.end || '选择省|市|区'}}</view>
				</picker>
				<input type="text" placeholder="填写详细地址可帮您更快的找到司机">
			</div> -->
			<!-- <div class="con">
				<h2>卸货时间</h2>
				<picker mode="region" @change="chooseEndTime" >
					<view class="picker">{{times.end || '请选择'}}</view>
				</picker>
			</div> -->
		</div>
		<div class="message">
			<var-row>
				<van-col :span="12">*选择车型</van-col>
				<van-col :span="12">
					<picker mode="region" @change="chooseCart" >
						<view class="picker">{{carts || '请选择车型'}}</view>
					</picker>
				</van-col>
			</var-row>
			<var-row>
				<van-col :span="12">*货物重量/体积至少填写一项</van-col>
				<van-col :span="12">
					<input type="text">吨
				</van-col>
			</var-row>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				carts:'',
				times:{
					start:'',
					end:''
				},
				address:{
				  "cargoName": "货物名称",
				  "cargoVolume": "30",
				  "cargoWeight": "55.6",
				  "deposit": "200",
				  "dischargeDate": "2019-05-15 19:14:24",
				  "endAddr": "卸货地详细地址",
				  "endAreaCode": "",
				  "endCityCode": "",
				  "endLatitude": "31.3017283408",
				  "endLongitude": "120.5771827698",
				  "endProvinceCode": "",
				  "expectFreightRate": "",
				  "isOverspeedOvermanTransfinite": "0",
				  "isRegularCargoOrigin": "1",
				  "loadDate": "2019-05-18 19:14:24",
				  "loadNumAndDischargeNum": "1",
				  "payMode": "1",
				  "receipt": "0",
				  "remark": "备注",
				  "specificRequirement": "特殊要求",
				  "startAddr": "装货地详细地址",
				  "startAreaCode": "",
				  "startCityCode": "",
				  "startLatitude": "31.2311513192",
				  "startLongitude": "121.4627838344",
				  "startProvinceCode": "",
				  "vehicleSize": "124",
				  "vehicleType": "1"
				},
			}
		},
		onLoad() {

		},
		methods: {
			chooseEndTime(e){
				
			},
			chooseEndAddress(e){
				let self = this
				let address = e.detail.value
				self.address.end = address[1]
			},
			// 选择开始时间
			chooseStartTime(e){
				
			},
			//选择开始地址
			chooseStartAddress(e){
				let self = this
				let address = e.detail.value
				self.address.start = address[1]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f2f2f2;
		.address{
			background-color: #fff;
			width: 100%;
			.top{
				width: 100%;
				
			}
			.baseInfor{
				width: 100%;
				background: #333;
				border-left:1px solid lightgreen;
			}
		}
			
	}
</style>
