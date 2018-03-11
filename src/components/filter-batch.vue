<template>
	<div class="check-users">
		<div class="check-users-content" v-bar>
			<div>
				<div class="command">
					<div class="com-header">
						<img src="../common/img/check/server.png" >
						<label class="hearder-text" style="color:#28be93">系统</label>
						<button class="tog-btn " :class="[isComd?'tog-btn-ser':'tog-btn-serDown']" @click="togUserSelect('command')"></button>
					</div>
					<transition >
						<table v-if="isComd">
							<thead>
								<tr>
									<th v-for="head in tableHeads" :key="head.key">{{head.label}}</th>
								</tr>
							</thead>
							<tbody >
								<tr-component  v-for="(item,index) in comTabData" :table="item" :index="index" :batchId="batchId" @change="changeBatchId($event)" ></tr-component>
							</tbody>
						</table>
					</transition>
				</div>
				<div class="check-mine">
					<div class="com-header">
						<img src="../common/img/check/mine.png" >
						<label class="hearder-text" style="color:#259bdc">我的</label>
						<button class="tog-btn" :class="[isMine?'tog-btn-me':'tog-btn-meDown']" @click="togUserSelect('target')"></button>
					</div>
					<transition >
						<table v-if="isMine">
							<thead>
								<tr>
									<th v-for="head in tableHeads" :key="head.key">{{head.label}}</th>
								</tr>
							</thead>
							<tbody>
								<tr-component  v-for="(item,index) in meTabData" :table="item" :index="index" :batchId="batchId" @change="changeBatchId($event)"></tr-component>
							</tbody>
						</table>
					</transition>
				</div>
			</div>	
		</div>
		<div class="check-users-footer">
			<a class="check-users-confirm" @click="closeModal('submit')">确定</a>
		</div>
		<div class="check-users-close" @click="closeModal('close')">
			<img src="../common/img/check/close.png" alt="">
		</div>
	</div>
</template>

<script>
const trComponent = {
	name:'tr-component',
	props:['table','index'],
	data(){
		return{
			batchId:''
		}
	},
	template:`
		<tr @click="togglebatcher(table.isChecked,table,index)">
			<!--<td style="width:60px"><input type="radio" v-model="batchId" name="batchId" :value="table.batchId" :checked = 'table.isChecked'></td>-->
			<td><span class="check-radio" :class="[table.isChecked?'checked-radio':'']"></span></td>
			<td style="width:164px">{{table.creatTime}}</td>
			<td :title="table.batchName" ><div style="width:200px" class="text-over">{{table.batchName}}</div></td>
			<td ><div style="width:154px">{{table.batchNum}}人</div></td>
		</tr>
	`,
	methods:{
		togglebatcher(checked,table,index){
			//console.log(table)
			let arr = []
			arr.push(table)
			arr.push(index)
			arr.push(checked)
			this.$emit('change',arr)
		}
	}
}
	export default{
		components:{trComponent},
		props:{
			comTabData:{
				type:Array,
				default:()=>{ return [] }
			},
			meTabData:{
				type:Array,
				default:()=>{ return []}
			}
		},
		data(){
			return{
				isComd:true,
				isMine:true,
				batchId:{},
				tableHeads: [
		            {
		              label: '',
		              key: 'batchId'
		            },{
		              label: '创建时间',
		              key: 'startTime'
		            },{
		              label: '用户群名称',
		              key: 'batchName'
		            },{
		              label: '用户规模',
		              key: 'batchNum'
		            }
				]
			}
		},
		methods:{
			togUserSelect(flag){
				if(flag=='command'){
					this.isComd = this.isComd == true?false:true
				}else if(flag=='target'){
					this.isMine = this.isMine == true?false:true
				}
			},
			changeBatchId(param){
				this.comTabData.forEach( function(element, index) {
					element.isChecked = false
				});
				this.meTabData.forEach( function(element, index) {
					element.isChecked = false
				});
				if(param[0].batchId == ( this.comTabData[param[1]] && this.comTabData[param[1]].batchId) ){
					//console.log('推荐指标被点击')
					this.comTabData[param[1]].isChecked = param[2] == true?false:true
				}else if( param[0].batchId ==  (this.meTabData[param[1]] && this.meTabData[param[1]].batchId ) ){
					//console.log('我的用户群指标被点击')
					this.meTabData[param[1]].isChecked = param[2] == true?false:true
				}
				this.batchId = param[0]
			},
			closeModal(param){
				let eventObj  = {}
				if(param =='submit'){
					eventObj.type = 'submit'
					eventObj.val = this.batchId
				}else if(param =='close'){
					eventObj.type = 'close'
					eventObj.val = ''
				}
				this.$emit('on-change',eventObj)
			}
		}
	}

</script>
<style>
.text-over{
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis;
	/*cursor: pointer;*/
}
.check-users-footer{
	text-align:center;
	margin-top:2%;
}
.check-users-confirm{
	width:360px;
	height: 40px;
	background-color:#28be93;
	display: inline-block;
	cursor: default;  
	line-height: 40px;
	border-radius:20px;
	font-size: 18px;
	letter-spacing: 2px;
	cursor: pointer;
}
.check-users-close{
	position: absolute;
    top: -20px;
    right: -20px;
    cursor: pointer;
}
.check-users{
	/*width:48%;
	height:80%;*/
	width: 680px;
	height: 580px;
	background-color: #0f376f;
	border-radius: 5px;
	padding: 10px 10px 10px 20px;
	position: fixed;
	top: 50%;
	margin-top: -20%;
	/*margin-left: -340px;*/
}
.check-users-content{
	height:85%;
}
.check-users table{
	width:96%;
	text-align: left;
	margin-left: 20px;
}
.check-users table td:first-child{
	text-align: center;
	width:60px;
}
.check-radio {
	position: relative;
	display: inline-block;
	width: 12px;
	height: 12px;
	border-radius:50%;
}
.command .check-radio {
	background-color: #0e3d6e;
	border:1px solid  #28be93;
}
.command .checked-radio{
	background-color:#fff;
	border:3px solid  #28be93;
}
.check-mine .check-radio{
	background-color:#0e3d6e;
	border:1px solid  #259bdc;
}
.check-mine .checked-radio{
	background-color:#fff;
	border:3px solid #259bdc;
}

/*.check-users input[type="radio"]{
	position: relative;
	cursor: pointer;
}
.check-users input[type="radio"]:after{
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	background-size: 100%;
    background-position: center;
	background-repeat: no-repeat;
	position: absolute;
	top:0;
	left:0;
	border-radius:50% ;
	box-sizing: border-box;
}
.command table input[type="radio"]:after{
	background-color: #0e3d6e;
	border:1px solid  #28be93;
}
.command table input[type="radio"]:checked:after,.command table input[type="radio"]:hover:after{
	background-color:#fff;
	border:3px solid  #28be93;
}
.check-mine table input[type="radio"]:after{
	background-color:#0e3d6e;
	border:1px solid  #259bdc;
}
.check-mine table input[type="radio"]:checked:after,.check-mine table input[type="radio"]:hover:after{
	background-color:#fff;
	border:3px solid #259bdc;
}*/
.check-users table tr{
	height:36px;
	line-height:36px;
	cursor: pointer;
}
.command,.check-mine{
	padding: 10px 0;
}
.command table th{
	color: #28be93;
	font-weight: bold;
	background-color:#0e3d6e; 
}
.command table tbody>tr:nth-child(even) td{
	background-color:#0e3d6e;
}
.check-mine table th{
	color: #259bdc;
	font-weight: bold;
	background-color:#133b74; 
}
.check-mine table tbody>tr:nth-child(even) td{
	background-color:#133b74;
}
.hearder-text{
	font-size: 16px;
	letter-spacing: 1px;
	font-weight:bold;
	vertical-align: super;
	margin-left: 10px;
}
.tog-btn{
	border: none;
	width: 20px;
	height: 20px;
	float: right;
	margin-right:20px;
}
.tog-btn-ser{
	background:url(../common/img/check/ser-tog.png) 0px 5px no-repeat;
}
.tog-btn-serDown{
	background:url(../common/img/check/ser-tog-down.png) 0px 5px no-repeat;
}
.tog-btn-me{
	background:url(../common/img/check/me-tog.png) 0px 5px no-repeat;
}
.tog-btn-meDown{
	background:url(../common/img/check/me-tog-down.png) 0px 5px no-repeat;
}
</style>