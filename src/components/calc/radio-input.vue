<template>
	<div class="sum-list-item">
		<label style="width:100px;text-align:right;">{{radioData.desc}}：</label>
		<label v-for="item in radioData.tags">
			<input type="radio" 
				:name="radioData.name" 
				:value="item.tagValue"
				v-model="value">
			{{item.tagDesc}}
		</label>
	</div>
</template>
<script>
	export default{
		props:{
			radioData:{
				type:Object,
				default:function(){
					return{
						desc:'收入',
						name:'fee',
						"initValue":"1",
						tags:[
							{tagValue:'1',tagDesc:'是'},
							{tagValue:'0',tagDesc:'否'},
						]
					}
				}
			}
		},
		data(){
			return {
				value:''
			}
		},
		created(){
			//console.log(this.radioData.initValue)
			this.value = this.radioData.initValue
			
		},
		computed: {
			initValue() {
		　　　　return this.radioData.initValue
		　　}
		},
		watch:{
			initValue(newValue, oldValue){
				this.value = newValue
				console.log(this.radioData)
			}
		}
	}
</script>
<style scoped>
	.sum-list-item label{
		display: inline-block;
		width:60px;
	}
	.sum-list-item input[type="radio"]{
		position: relative;
	}
	.sum-list-item input[type="radio"]:after {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		background-size: 100%;
	    background-position: center;
		background-repeat: no-repeat;
		position: absolute;
		top: 0;
		left: 0;
	}
	.sum-list-item input[type="radio"]:after {
		background-color: #353b47;
		background-image: url('../../assets/imgs/radio_false.png');
	}
	.sum-list-item input[type="radio"]:checked:after {
		background-image: url('../../assets/imgs/radio_true.png');
	}
</style>