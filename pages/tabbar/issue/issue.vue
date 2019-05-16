<template>
	<view class="content">
		<div class="address">
			<div class="top">
				<van-row>
					<van-col :span="12">*装货地</van-col>
					<van-col :span="12">
						<picker mode="region" @change="chooseStartCity" >
							<view class="picker" >{{startAreaCode || '选择省 | 市 | 区'}}</view>
						</picker>
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="24">
						<input type="text" placeholder="填写详细地址可帮您更快的找到司机" :value="startAddr" @change="chooseStartAddr">
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="12">装货时间</van-col>
					<van-col :span="6">
						<picker mode="date" @change="chooseLoadDate" >
							<view class="date">{{loadDate || '年月日'}}</view>
						</picker>
					</van-col>
					<van-col :span="6">
						<picker mode="time" @change="chooseLoadTime" >
							<view class="date">{{loadTime || '时分'}}</view>
						</picker>
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="12">*卸货地</van-col>
					<van-col :span="12">
						<picker mode="region" @change="chooseEndCity" >
							<view class="picker" >{{endAreaCode || '选择省 | 市 | 区'}}</view>
						</picker>
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="24">
						<input type="text" placeholder="填写详细地址可帮您更快的找到司机" :value="endAddr" @change="chooseEndAddr">
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="12">卸货时间</van-col>
					<van-col :span="6">
						<picker mode="date" @change="chooseDischargeDate" >
							<view class="date">{{dischargeDate || '年月日'}}</view>
						</picker>
					</van-col>
					<van-col :span="6">
						<picker mode="time" @change="chooseDischargeTime" >
							<view class="date">{{dischargeTime || '时分'}}</view>
						</picker>
					</van-col>
				</van-row>
			</div>
		</div>
		<div class="baseInfor">基础信息</div>
		<div class="message">
			<van-row>
				<van-col :span="12">*选择车型</van-col>
				<van-col :span="12">
					 <picker @change="chooseVehicleType" :range="carts" >
					   <view class="date">{{vehicleType || '请选择'}}</view>
					</picker>
				</van-col>
			</van-row>
			<van-row>
				<van-col :span="12">*货物重量</van-col>
				<van-col :span="12">
					<input type="text" :value="cargoWeight" @change="chooseCargoWeight">千克
				</van-col>
			</van-row>
			<van-row>
				<van-col :span="12">*货物体积</van-col>
				<van-col :span="12">
					<input type="text" :value="cargoVolume" @change="chooseCargoVolume">m3
				</van-col>
			</van-row>
		</div>
		<div class="baseInfor">货物信息</div>
		<div class="cargo">
			<van-row>
				<van-col :span="12">*货物名称</van-col>
				<van-col :span="12"><input type="text" placeholder="必填货物名称" :value="cargoName" @change="chooseCargoName"></van-col>
			</van-row>
		</div>
		<div class="baseInfor">装卸信息</div>
		<div class="handling">
			<van-row>
				<van-col :span="12">*装卸方式</van-col>
				<van-col :span="12">
					<picker @change="chooseLoadNumAndDischargeNum" :range="handlingList" >
					   <view class="date">{{loadNumAndDischargeNum || '请选择'}}</view>
					</picker>
				</van-col>
			</van-row>
		</div>
		<div class="baseInfor">支付信息</div>
		<div class="pay">
			<van-row>
				<van-col :span="12">*预期运价</van-col>
				<van-col :span="12"><input type="text" :value="expectFreightRate" @change="chooseExpectFreightRate" placeholder="请合理填写运费 元/趟" /></van-col>
			</van-row>
			<van-row>
				<van-col :span="12">*支付方式</van-col>
				<van-col :span="12">
					<picker @change="choosePayMode" :range="money">
					   <view class="date">{{payMode || '请选择'}}</view>
					</picker>
				</van-col>
			</van-row>
		</div>
		<div class="baseInfor">其他</div>
		<div class="comment">
			<van-row>
				<van-col :span="12">回单</van-col>
				<van-col :span="12">
					<!-- <van-radio-group v-model="radio">
					  <van-radio name="1">单选框 1</van-radio>
					  <van-radio name="2">单选框 2</van-radio>
					</van-radio-group> -->
				</van-col>
			</van-row>
			<van-row>
				<van-col :span="12">备注</van-col>
				<van-col :span="12"><input type="text" placeholder="请输入其他要求" :value="remark" @change="chooseRemark"> </van-col>
			</van-row>
		</div>
		<button type="primary" @click="issueList">发布</button>
		
	</view>
</template>

<script>
	export default {
		mounted(){
			let self=this
			// 车型
			self.$request.get({
				url:'/getDictionary/transportType'
			}).then((res)=>{
				self.carts=[]
				res.childrenDictionaryList.forEach(element => {
				    self.carts.push(element.name)
				});
			})
			//支付方式
			self.$request.get({
				url:'/getDictionary/paymentMethod%20'
			}).then(res=>{
				res.childrenDictionaryList.forEach(element=>{
					self.money.push(element.name)
				})
			})
			// 装卸方式
			self.$request.get({
				url:'/getDictionary/loadAndDischarge'
			}).then(res=>{
				res.childrenDictionaryList.forEach(element=>{
					self.handlingList.push(element.name)
				})
			})
			
		},
		data() {
			return {
				billing:[],
				handlingList:[],
				money:[],
				carts:['小汽车', '大卡车'],
				cargoName: "",
				cargoVolume: "",
				cargoWeight: "",
				//最终卸货之间
				lastdischargeDate:"",
				dischargeTime:"",
				dischargeDate: "",
				endAddr: "",
				endAreaCode: "",
				endCityCode: "",
				endLatitude: "31.3017283408",
				endLongitude: "120.5771827698",
				endProvinceCode: "",
				expectFreightRate: "",
				isOverspeedOvermanTransfinite: "0",
				isRegularCargoOrigin: "1",
				//最终装货时间
				lastLoadDate:"",
				loadTime:"",
				loadDate: "",
				loadNumAndDischargeNum: "1",
				payMode: "",
				receipt: "0",
				remark: "",
				specificRequirement: "",
				startAddr: "",
				startAreaCode: "",
				startCityCode: "",
				startLatitude: "31.2311513192",
				startLongitude: "121.4627838344",
				startProvinceCode: "",
				vehicleSize: "124",
				vehicleType: ""
			}
		},
		methods: {
			// 单击发布按钮
			issueList(e){
				let self=this
				console.log(e)
				self.$request.post({
					url:'/logistics/shipperGoodsReleased/add',
					data:{
						cargoName:self.cargoName,
						cargoVolume:self.cargoVolume,
						cargoWeight:self.cargoWeight,
						dischargeDate: "卸货时间(yyyy-MM-dd HH:mm:ss)",
						endAddr:self.endAddr,
						endAreaCode:self.endAreaCode,
						endCityCode:self.endCityCode,
						endProvinceCode:self.endProvinceCode,
						  "endLatitude": "*目的定位纬度",
						  "endLongitude": "*目的定位经度",
						expectFreightRate:self.expectFreightRate,
						  "id": "编号(新增为null 修改时传值)",
						  "isOverspeedOvermanTransfinite": "是否三超(0 否 1 是)",
						  "isRegularCargoOrigin": "是否常发货源(0 否 1 是)",
						  "loadDate": "装货时间(yyyy-MM-dd HH:mm:ss)",
						  "loadNumAndDischargeNum": "几装几卸",
						  "payMode": "支付方式",
						  "receipt": "是否需要回单(0 否 1 是)",
						  "remark": "备注",
						  "specificRequirement": "特殊要求",
						  "startAddr": "装货地详细地址",
						  "startAreaCode": "*始发区",
						  "startCityCode": "*始发市",
						  "startLatitude": "*始发定位纬度",
						  "startLongitude": "始发定位经度",
						  "startProvinceCode": "*始发省",
						  "vehicleSize": "车长",
						  "vehicleType": "车型"
					}
				})
			},
			// 装卸方式
			chooseLoadNumAndDischargeNum(e){
				let self=this
				let loadNumAndDischargeNum=e.detail.value
				self.loadNumAndDischargeNum=self.handlingList[loadNumAndDischargeNum]
			},
			// 备注
			chooseRemark(e){
				let self=this
				let remark=e.detail.value
				self.remark=remark
			},
			// 支付方式
			choosePayMode(e){
				let self=this
				let payMode=e.detail.value
				self.payMode=self.money[payMode]
			},
			// 预期运价
			chooseExpectFreightRate(e){
				let self=this
				let expectFreightRate=e.detail.value
				self.expectFreightRate=expectFreightRate
			},
			// 货物名称
			chooseCargoName(e){
				let self=this
				let cargoName=e.detail.value
				self.cargoName=cargoName
			},
			// 货物体积
			chooseCargoVolume(e){
				let self=this
				let cargoVolume=e.detail.value
				self.cargoVolume=cargoVolume
			},
			// 货物重量
			chooseCargoWeight(e){
				let self=this
				let cargoWeight=e.detail.value
				self.cargoWeight=cargoWeight
			},
			// 车型
			chooseVehicleType(e){
				let self=this
				let vehicleType=e.detail.value
				self.vehicleType=this.carts[vehicleType]
			},
			//卸货时间时分
			chooseDischargeTime(e){
				let self=this
				let dischargeTime=e.detail.value
				self.dischargeTime=dischargeTime
			},
			// 卸货时间年月日
			chooseDischargeDate(e){
				let self=this
				let dischargeDate=e.detail.value
				self.dischargeDate=dischargeDate
			},
			// 卸货详细地址
			chooseEndAddr(e){
				let self=this
				let endAddr=e.detail.value
				self.endAddr=endAddr
			},
			// 卸货地
			chooseEndCity(e){
				let self=this
				let val=e.detail.value
				self.endProvinceCode=val[0]
				self.endCityCode=val[1]
				self.endAreaCode=val[2]
			},
			//装货时间时分
			chooseLoadTime(e){
				let self=this
				let loadTime=e.detail.value
				self.loadTime=loadTime
			},
			// 装货时间年月日
			chooseLoadDate(e){
				let self=this
				let loadDate=e.detail.value
				self.loadDate=loadDate
			},
			// 装货详细开始地址
			chooseStartAddr(e){
				let self=this
				let startAddr=e.detail.value
				self.startAddr=startAddr
			},
			// 选择装货城市
			chooseStartCity(e){
				let self=this
				let val=e.detail.value
				self.startProvinceCode=val[0]
				self.startCityCode=val[1]
				self.startAreaCode=val[2]
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
			padding: 30upx 30upx 0;
			.top{
				width: 100%;
			}
		}
		.baseInfor{
			margin-left: 30upx;
			width: 100%;
			background: #f2f2f2;
			border-left:2upx solid lightgreen;
		}
		.message,.cargo,.handling,.pay,.comment{
			background-color: #fff;
			padding: 30upx 30upx 0;
		}
	}
</style>
