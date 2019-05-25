<template>
	<view class="content">
		<div class="address">
			<div class="top">
				<van-row>
					<van-col :span="11">*装货地</van-col>
					<van-col :span="13">
							<view  @click="chooseStartNode">{{startname || '选择装货地'}}</view>
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="24">
						<input type="text" placeholder="填写详细地址可帮您更快的找到司机" :value="startAddr" @change="chooseStartAddr" >
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="11">装货时间</van-col>
					<van-col :span="6">
						<picker mode="date" @change="chooseLoadDate" >
							<view class="date">{{loadDate || '年月日'}}</view>
						</picker>
					</van-col>
					<van-col :span="7">
						<picker mode="time" @change="chooseLoadTime" >
							<view class="date">{{loadTime || '时分'}}</view>
						</picker>
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="11">*卸货地</van-col>
					<van-col :span="13">
							<view @click="chooseEndNode" >{{endname || '选择卸货地'}}</view>
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="24">
						<input type="text" placeholder="填写详细地址可帮您更快的找到司机" :value="endAddr" @change="chooseEndAddr">
					</van-col>
				</van-row>
				<van-row>
					<van-col :span="11">卸货时间</van-col>
					<van-col :span="6">
						<picker mode="date" @change="chooseDischargeDate" >
							<view class="date">{{dischargeDate || '年月日'}}</view>
						</picker>
					</van-col>
					<van-col :span="7">
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
					<input type="number" :value="cargoWeight" @change="chooseCargoWeight" placeholder="千克">
				</van-col>
			</van-row>
			<van-row>
				<van-col :span="12">*货物体积</van-col>
				<van-col :span="12">
					<input type="number" :value="cargoVolume" @change="chooseCargoVolume" placeholder="m3">
				</van-col>
			</van-row>
			<van-row>
				<van-col :span="12">*是否三超</van-col>
				<van-col :span="12">
					 <van-radio-group custom-class="vantRadioType" :value="isOverspeedOvermanTransfinite" @change="chooseIsOverspeedOvermanTransfinite">
						<van-radio  name="0" >是</van-radio>
					 	<van-radio  name="1" >否</van-radio>
					 </van-radio-group>
				</van-col>
			</van-row>
			<!-- <van-row>
				<van-col :span="12">*是否常发货源</van-col>
				<van-col :span="12">
					<van-radio-group :value="isRegularCargoOrigin" @change="chooseIsRegularCargoOrigin">
						<van-radio custom-class="vantRadioType" name="0" >是</van-radio>
						<van-radio custom-class="vantRadioType" name="1" >否</van-radio>
					</van-radio-group>
				</van-col>
			</van-row> -->
		</div>
		<div class="baseInfor">货物信息</div>
		<div class="cargo">
			<van-row>
				<van-col :span="12">*货物名称</van-col>
				<van-col :span="12"><input type="text" placeholder="必填货物名称" @change="chooseCargoName"></van-col>
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
				<van-col :span="12"><input type="number" :value="expectFreightRate" @change="chooseExpectFreightRate" placeholder="请合理填写运费 元/趟" /></van-col>
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
					<van-radio-group :value="receipt" @change="chooseReceipt">
						<van-radio name="0" >是</van-radio>
						<van-radio name="1" >否</van-radio>
					</van-radio-group>
				</van-col>
			</van-row>
			<van-row>
				<van-col :span="12">备注</van-col>
				<van-col :span="12"><input type="text" placeholder="请输入其他要求" :value="remark" @change="chooseRemark"> </van-col>
			</van-row>
		</div>
		<view class="updelete">
			<button type="primary" @tap="deletes(id)">删除</button>
			<button type="primary" @click="issueList">发布</button>
			
		</view>
		
		
	</view>
</template>

<script>
	import Checker from '@/common/graceChecker.js'
	import loadcity from '@/utils/loadCity.js'
	export default {
		onLoad(options) {
			let self = this;
			self.id = options.id;
			self.$request.get({
				url:'/logistics/shipperGoodsReleased/get/' + self.id,
			}).then((res)=>{
				console.log(res)
				self.startAddr = res.shipperGoodsReleased.startAddr
				self.endAddr = res.shipperGoodsReleased.endAddr
				self.startLongitude = res.shipperGoodsReleased.startLongitude
				self.startLatitude = res.shipperGoodsReleased.startLatitude
				self.endLongitude = res.shipperGoodsReleased.endLongitude
				self.endLatitude = res.shipperGoodsReleased.endLatitude
				self.vehicleType = res.shipperGoodsReleased.vehicleType
				
						self.cargoName = res.shipperGoodsReleased.cargoName,
						self.cargoVolume = res.shipperGoodsReleased.cargoVolume,
						self.cargoWeight = res.shipperGoodsReleased.cargoWeight,
						// self.dischargeDate = res.shipperGoodsReleased.lastdischargeDate,
						self.endAreaCode = res.shipperGoodsReleased.endAreaCode,
						self.endCityCode = res.shipperGoodsReleased.endCityCode,
						self.endProvinceCode = res.shipperGoodsReleased.endProvinceCode,
						self.expectFreightRate = res.shipperGoodsReleased.expectFreightRate,
						self.isOverspeedOvermanTransfinite = res.shipperGoodsReleased.isOverspeedOvermanTransfinite,
						// self.isRegularCargoOrigin = 0,
						// self.loadDate = res.shipperGoodsReleased.lastLoadDate,
						self.loadNumAndDischargeNum = res.shipperGoodsReleased.loadNumAndDischargeNum,
						self.payMode = res.shipperGoodsReleased.payMode,
						self.receipt = res.shipperGoodsReleased.receipt,
						self.remark = res.shipperGoodsReleased.remark,
						self.startAreaCode = res.shipperGoodsReleased.startAreaCode,
						self.startCityCode = res.shipperGoodsReleased.startCityCode,
						self.startProvinceCode = res.shipperGoodsReleased.startProvinceCode,
					
				loadcity(res.shipperGoodsReleased.startLongitude,res.shipperGoodsReleased.startLatitude).then((res)=>{
					console.log(res)
					for(var i=0;i<1 ;i++){
						self.startname = res.regeocode.aois[i].name
					}
					// self.startname = .name
				})
				loadcity(res.shipperGoodsReleased.endLongitude,res.shipperGoodsReleased.endLatitude).then((res)=>{
					console.log(res)
					for(var i=0;i<1 ;i++){
						self.endname = res.regeocode.aois[i].name
					}
					// self.startname = .name
				})
				console.log()
				
			})
		},
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
				//卸货地名字
				endname:"",
				endAddr: "",
				endAreaCode: "",
				endCityCode: "",
				endLatitude: "31.3017283408",
				endLongitude: "120.5771827698",
				endProvinceCode: "",
				expectFreightRate: "",
				isOverspeedOvermanTransfinite: "1",
				isRegularCargoOrigin: "0",
				//最终装货时间
				lastLoadDate:"",
				loadTime:"",
				loadDate: "",
				loadNumAndDischargeNum: "",
				payMode: "",
				receipt: "1",
				remark: "",
				specificRequirement: "",
				//始发地名字
				startname:"",
				startAddr: "",
				startAreaCode: "",
				startCityCode: "",
				startLatitude: "",
				startLongitude: "",
				startProvinceCode: "",
				vehicleSize: "124",
				vehicleType: "",
				id:""//货源id
			}
		},
		methods: {
			deletes(id){
				let self = this;
				uni.showModal({
					title: '',
					content: '确定要删除吗',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						console.log(res)
							
						if(res.confirm){
							self.$request.Delete({
								url:'/logistics/shipperGoodsReleased/delete/' + id
							}).then((res)=>{
								
									uni.showToast({
										title: '删除成功',
										icon:"none"
									});
									setTimeout(()=>{
										uni.navigateBack({
											delta: 1
										});
									},1000)
								})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 卸货地
			chooseEndNode(e){
				let self=this
				uni.chooseLocation({
					success(res) {
						self.endLongitude=res.longitude
						self.endLatitude=res.latitude
						self.endname=res.name
					}	
				})
			},
			// 装货地
			 chooseStartNode(e){
			    let self = this
			    uni.chooseLocation({
			        success: res => {
					self.startLongitude=res.longitude
					self.startLatitude=res.latitude
					self.startname=res.name
			        }
			    })
			},
			// 单击发布按钮
			issueList(e){
				let self=this
				//时间拼接
				let lastLoadDate=`${self.loadDate} ${self.loadTime}:00`
				self.lastLoadDate=lastLoadDate
				let lastdischargeDate=`${self.dischargeDate} ${self.dischargeTime}:00`
				self.lastdischargeDate=lastdischargeDate
				let tempRuleObject = {
						cargoName:self.cargoName,
						cargoVolume:self.cargoVolume,
						cargoWeight:self.cargoWeight,
						dischargeDate:self.lastdischargeDate,
						endAddr:self.endAddr,
						endAreaCode:self.endAreaCode,
						endCityCode:self.endCityCode,
						endProvinceCode:self.endProvinceCode,
						endLatitude:self.endLatitude,
						endLongitude:self.endLongitude,
						expectFreightRate:self.expectFreightRate,
						isOverspeedOvermanTransfinite:self.isOverspeedOvermanTransfinite,
						isRegularCargoOrigin:self.isRegularCargoOrigin,
						loadDate:self.lastLoadDate,
						loadNumAndDischargeNum:self.loadNumAndDischargeNum,
						payMode:self.payMode,
						receipt:self.receipt,
						remark:self.remark,
						startAddr:self.startAddr,
						startAreaCode:self.startAreaCode,
						startCityCode:self.startCityCode,
						startLatitude:self.startLatitude,
						startLongitude:self.startLongitude,
						startProvinceCode:self.startProvinceCode,
						vehicleType:self.vehicleType
					}
				let rule = [
					{ name: "cargoName", checkType: "notnull" , errorMsg: "货物名称不能为空" },
					{ name: "cargoWeight", checkType: "notnull", errorMsg: "货物重量不能为空" },
				    { name: "cargoVolume", checkType: "notnull", errorMsg: "货物体积不能为空" },
					{ name: "startAddr", checkType: "notnull", errorMsg: "装货地址不能为空" },
					{ name: "endAddr", checkType: "notnull", errorMsg: "卸货地址不能为空" },
					{ name: "dischargeDate", checkType: "notnull", errorMsg: "卸货时间不能为空" },
					{ name: "payMode", checkType: "notnull", errorMsg: "支付方式不能为空" },
					{ name: "loadNumAndDischargeNum", checkType: "notnull", errorMsg: "装卸方式不能为空" },
					{ name: "loadDate", checkType: "notnull", errorMsg: "装货时间不能为空" },
					{ name: "startLongitude", checkType: "notnull", errorMsg: "始发精度不能为空" },
					{ name: "startLatitude", checkType: "notnull", errorMsg: "始发纬度不能为空" },
					{ name: "endLongitude", checkType: "notnull", errorMsg: "目的精度不能为空" },
					{ name: "endLatitude", checkType: "notnull", errorMsg: "目的纬度不能为空" }
				]
				let isPass = Checker.check(tempRuleObject, rule)
				if(Checker.error){
					uni.showToast({
						title: Checker.error,
						icon: 'none'
					})
					return false
				}
				
				
				let p=self.$request.post({
					url:'/logistics/shipperGoodsReleased/add',
					data:tempRuleObject
				})
				p.then(res=>{
					uni.showModal({
						title: '发布成功',
						content: '货源发布成功，是否跳转个人中心-常发货源中查看',
						success(res) {
							if (res.confirm) {
								uni.switchTab({
									url:'../../tabbar/personalCenter/personalCenter'
								})
							} else if (res.cancel) {
								slef.cargoName = ''
								self.cargoVolume = ''
								self.cargoWeight = ''
								self.lastdis = ''
								self.chargeDate = ''
								self.endAddr = ''
								self.endAreaCode = ''
								self.endCityCode = ''
								self.endProvinceCode = ''
								self.endLatitude = ''
								self.endLongitude = ''
								self.expectFreightRate = ''
								self.isOverspeedOver = ''
								self.manTransfinite = ''
								self.isRegularCargoOrigin = ''
								self.lastLoadDate = ''
								self.loadNumAndDis = ''
								self.chargeNumpayMode = ''
								self.receiptremark = ''
								self.startAddr = ''
								self.startAreaCodes = ''
								self.tartCityCode = ''
								self.startLatitude = ''
								self.startLongitude = ''
								self.startProvinceCode = ''
								self.vehicleType = ''
							}
						}
					})
				})
			},
			// 是否常发货源
			chooseIsRegularCargoOrigin(e){
				let self=this
				let isRegularCargoOrigin=e.detail
				self.isRegularCargoOrigin=isRegularCargoOrigin
			},
			// 是否三超
			chooseIsOverspeedOvermanTransfinite(e){
				let self=this
				let isOverspeedOvermanTransfinite=e.detail
				self.isOverspeedOvermanTransfinite=isOverspeedOvermanTransfinite
			},
			// 是否回单
			chooseReceipt(e){
				let self=this
				let receipt=e.detail
				self.receipt=receipt
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
				console.log(e)
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
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f2f2f2;
		width: 100%;
		overflow: hidden;
		margin-bottom: 100upx;
		.address{
			background-color: #fff;
			width: 100%;
			padding: 30upx 30upx 0;
			.top{
				width: 100%;
				van-cell-group{
					width: 100%;
					height: 300upx;
					van-field{
						width: 100%;
						height: 50upx;
					}
				}
			}
		}
		van-row{
			border-bottom: #f2f2f2 solid 1upx;
			display: block;
			padding: 20upx 0;
		}
		van-col{
			color: #111;
			font-size: 28upx;
		}
		van-radio-group{
			display: flex;
		}
		input{
			color: #333;
			font-size: 24upx;
		}
		.line{
			border-bottom: #333 solid 4upx;
		}
		.baseInfor{
			width: 100%;
			background: #f2f2f2;
			color: #333;
			font-size: 28upx;
			padding: 20upx 30upx;
		}
		.message,.cargo,.handling,.pay,.comment{
			background-color: #fff;
			padding: 0upx 30upx;
		}
		.message{
			.vantRadioType{
				font-size: 20upx;
			}
		}
		.updelete button:nth-child(2){
			width: 50%;
			// margin: 30upx auto;
			border-radius: 0;
			background: #F5222D;
			color: #FFFFFF;
		}
		.updelete button:nth-child(1){
			width: 50%;
			// margin: 30upx auto;
			border-radius: 0;
			background: #FEFEFE;
			color: #F5222D;
		}
		.updelete{
			width: 100vw;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index:999;
		}
		.updelete button{
			margin: 0;
			padding: 0;
			
		}
	}
</style>
