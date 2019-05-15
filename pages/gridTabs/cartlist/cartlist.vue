<template>
	<view>
		   <view class="uni-padding-wrap uni-common-mt">
            <form @submit="formSubmit" @reset="formReset">
                
               
                <view class="uni-form-item uni-column">
                    <view class="title">checkbox</view>
                    <checkbox-group name="checkbox">
                        <label>
                            <checkbox value="checkbox1" />选项一
                        </label>
                        <label>
                            <checkbox value="checkbox2" />选项二
                        </label>
                    </checkbox-group>
                </view>
             
                <view class="uni-btn-v">
                    <button formType="submit">Submit</button>
                </view>
            </form>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickerHidden: true,
				chosen: ''
			};
		},
		methods: {
        pickerConfirm: function(e) {
            this.pickerHidden = true
            this.chosen = e.target.value
        },
        pickerCancel: function(e) {
            this.pickerHidden = true
        },
        pickerShow: function(e) {
            this.pickerHidden = false
        },
        formSubmit: function(e) {
            console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
        },
        formReset: function(e) {
            console.log('清空数据')
            this.chosen = ''
        }
    }
	}
</script>

<style lang="scss">

</style>
