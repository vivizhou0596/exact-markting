<template>
	<div class="group-content">
		<!-- 第一个球体 -->
		<transition name="user-trans">
			<div 
				class="group-list0 none-bg"
				:class="{'list0-bg':userGroup[0]}" 
				@click = "turnBall(userGroup[0],0)"
			>
				{{userGroup[0]?userGroup[0].name:'请筛选或导入用户群' }}	
			</div> 
		</transition>
		<transition name="user-trans">
			<div class="group-list0 none-bg add" v-show="groupShow[0].isAdd" @click = "turnBall(userGroup[0],0)">
				<router-link :to="{path:'../filter',name:'filter',params:{batchId:'',fileAddr:''}}" class="add-icon"><img src="../common/img/filter.png" title="筛选后导入"></router-link>
				<router-link  :to="{path:'../upload'}" class="add-icon"><img src="../common/img/upload.png" title="批量导入"></router-link>
			</div>
		</transition>
		<transition name="user-trans">
			<div class="group-list0 list0-bg " v-show="groupShow[0].isDes" @click = "turnBall(userGroup[0],0)">
				<h5 class="list0-title ">{{userGroup[0]?userGroup[0].name:''}}</h5>
				<div class="list0-desc ">{{userGroup[0]?userGroup[0].desc:''}}</div>
				<div class="icon0-group">
					<router-link tag="button"  :to="{name:'check',params:{ batchId:(userGroup[0]&&userGroup[0].batchId),users:(userGroup[0]&&userGroup[0].users)},path:'../check'}" class="check-icon"><img src="../common/img/check.png" title="查看对比结果" alt=""></router-link>
					<router-link  tag="button" :to="{name:'filter',params:{ batchId:(userGroup[0]&&userGroup[0].batchId),fileAddr:(userGroup[0]&&userGroup[0].fileAddr) }}" class="check-icon " v-show="userGroup[0] && userGroup[0].createType" ><img src="../common/img/tiaozheng.png" title="修改筛选指标" alt=""></router-link>
				</div>
			</div>
		</transition>
		<!-- 第二个球体 -->
		<transition name="user-trans">
			<div class="group-list1 none-bg" 
				:class="{'list1-bg':userGroup[1]}"  
				@click = "turnBall(userGroup[1],1)" 
			>
			{{userGroup[1]?userGroup[1].name:'请筛选或导入用户群' }}
			</div>
		</transition>
		<transition name="user-trans">
			<div class="group-list1 none-bg add" v-show="groupShow[1].isAdd" @click = "turnBall(userGroup[1],1)">
				<router-link :to="{path:'../filter',name:'filter',params:{batchId:'',fileAddr:''}}" class="add-icon"><img src="../common/img/filter.png" title="筛选后导入"></router-link>
				<router-link  :to="{path:'../upload'}" class="add-icon"><img src="../common/img/upload.png" title="批量导入"></router-link>
			</div>
		</transition>
		<transition name="user-trans">
			<div class="group-list1 list1-bg " v-show="groupShow[1].isDes" @click = "turnBall(userGroup[1],1)">
				<h5 class="list1-title ">{{userGroup[1]?userGroup[1].name:''}}</h5>
				<div class="list1-desc ">{{userGroup[1]?userGroup[1].desc:''}}</div>
				<div class="icon1-group">
					<router-link :to="{name:'check',path:'../check',params:{batchId:(userGroup[1]&&userGroup[1].batchId),users:(userGroup[1]&&userGroup[1].users)}}" class="check-icon"><img src="../common/img/check.png" title="查看对比结果" alt=""></router-link>
					<router-link  :to="{name:'filter',path:'../filter',params:{batchId:(userGroup[1]&&userGroup[1].batchId),fileAddr:(userGroup[1]&&userGroup[1].fileAddr)}}" class="check-icon" v-show="userGroup[1] && userGroup[1].createType"><img src="../common/img/tiaozheng.png" title="修改筛选指标" alt=""></router-link>
				</div>
			</div>
		</transition>
		<!-- 第三个球体的处理 -->
		<transition name="user-trans">
			<div class="group-list2 none-bg" 
				:class="{'list2-bg':userGroup[2]}"  
				@click = "turnBall(userGroup[2],2)" 
			>
				{{userGroup[2]?userGroup[2].name:'请筛选或导入用户群' }}
			</div>
		</transition>
		<transition name="user-trans">
			<div class="group-list2 none-bg add" v-show="groupShow[2].isAdd" @click = "turnBall(userGroup[2],2)" >
				<router-link :to="{path:'../filter',name:'filter',params:{batchId:'',fileAddr:''}}" class="add-icon"><img src="../common/img/filter.png" title="筛选后导入"></router-link>
				<router-link  :to="{path:'../upload'}" class="add-icon"><img src="../common/img/upload.png" title="批量导入"></router-link>
			</div>
		</transition>
		<transition name="user-trans">
			<div class="group-list2 list2-bg " v-show="groupShow[2].isDes" @click = "turnBall(userGroup[2],2)" >
				<h5 class="list2-title ">{{userGroup[2]?userGroup[2].name:''}}</h5>
				<div class="list2-desc ">{{userGroup[2]?userGroup[2].desc:''}}</div>
				<div class="icon2-group">
					<router-link :to="{name:'check', path:'../check',params:{batchId:(userGroup[2]&&userGroup[2].batchId),users:(userGroup[2]&&userGroup[2].users)}}" class="check-icon"><img src="../common/img/check.png" title="查看对比结果" alt=""></router-link>
					<router-link  :to="{name:'filter', path:'../filter',params:{batchId:(userGroup[2]&&userGroup[2].batchId),fileAddr:(userGroup[2]&&userGroup[2].fileAddr)}}" class="check-icon" v-show="userGroup[2] && userGroup[2].createType"><img src="../common/img/tiaozheng.png" title="修改筛选指标" alt=""></router-link>
				</div>
			</div>
		</transition>
		<!-- 第四个球体 -->
		<transition name="user-trans">
			<div 
				class="group-list3 none-bg" 
				:class="{'list3-bg':userGroup[3]}"
				@click = "turnBall(userGroup[3],3)" 
			>
			{{userGroup[3]?userGroup[3].name:'请筛选或导入用户群' }}
			</div>
		</transition>
		<transition name="user-trans">
			<div class="group-list3 none-bg add" v-show="groupShow[3].isAdd" @click = "turnBall(userGroup[3],3)">
				<router-link :to="{path:'../filter',name:'filter',params:{batchId:'',fileAddr:''}}" class="add-icon"><img src="../common/img/filter.png" title="筛选后导入"></router-link>
				<router-link  :to="{path:'../upload'}" class="add-icon"><img src="../common/img/upload.png" title="批量导入"></router-link>
			</div>
		</transition>
		<transition name="user-trans">
			<div class="group-list3 list3-bg " v-show="groupShow[3].isDes" @click = "turnBall(userGroup[3],3)">
				<h5 class="list3-title ">{{userGroup[3]?userGroup[3].name:''}}</h5>
				<div class="list3-desc ">{{userGroup[3]?userGroup[3].desc:''}}</div>
				<div class="icon3-group">
					<router-link :to="{name:'check',path:'../check', params:{batchId:(userGroup[3]&&userGroup[3].batchId),users:(userGroup[3]&&userGroup[3].users)}}" class="check-icon"><img src="../common/img/check.png" title="查看对比结果" alt=""></router-link>
					<router-link :to="{name:'filter',path:'../filter',params:{batchId:(userGroup[3]&&userGroup[3].batchId),fileAddr:(userGroup[3]&&userGroup[3].fileAddr)}}"  class="check-icon" v-show="userGroup[3] && userGroup[3].createType"><img src="../common/img/tiaozheng.png" title="修改筛选指标" alt=""></router-link>
				</div>
			</div>
		</transition>
		<!-- 第五个球体 -->
		<transition name="user-trans">
			<div 
				class="group-list4 none-bg" 
				:class="{'list4-bg':userGroup[4]}" 
				@click = "turnBall(userGroup[4],4)" 
			>
			  {{userGroup[4]?userGroup[4].name:'请筛选或导入用户群' }}
			</div>
		</transition>
		<transition name="user-trans">
			<div class="group-list4 none-bg add" v-show="groupShow[4].isAdd" @click = "turnBall(userGroup[4],4)" >
				<router-link :to="{path:'../filter',name:'filter',params:{batchId:'',fileAddr:''}}" class="add-icon"><img src="../common/img/filter.png" title="筛选后导入"></router-link>
				<router-link  :to="{path:'../upload'}" class="add-icon"><img src="../common/img/upload.png" title="批量导入"></router-link>
			</div>
		</transition>
		<transition name="user-trans">
			<div class="group-list4 list4-bg " v-show="groupShow[4].isDes" @click = "turnBall(userGroup[4],4)" >
				<h5 class="list4-title ">{{userGroup[4]?userGroup[4].name:''}}</h5>
				<div class="list4-desc ">{{userGroup[4]?userGroup[4].desc:''}}</div>
				<div class="icon4-group">
					<router-link :to="{name:'check',path:'../check',params:{batchId:(userGroup[4]&&userGroup[4].batchId),users:(userGroup[4]&&userGroup[4].users)}}" class="check-icon"><img src="../common/img/check.png" title="查看对比结果" alt=""></router-link>
					<router-link :to="{name:'filter',path:'../filter',params:{batchId:(userGroup[4]&&userGroup[4].batchId),fileAddr:(userGroup[4]&&userGroup[4].fileAddr)}}"  class="check-icon" v-show="userGroup[4] && userGroup[4].createType"><img src="../common/img/tiaozheng.png" title="修改筛选指标" alt=""></router-link>
				</div>
			</div>
		</transition>
		<!-- 第六个球体 -->
		<transition name="user-trans">
			<div 
				class="group-list5 none-bg" 
				:class="{'list5-bg':userGroup[5]}" 
				@click = "turnBall(userGroup[5],5)" 
			>
			 {{userGroup[5]?userGroup[5].name:'请筛选或导入用户群' }}
			</div>
		</transition>
		<transition name="user-trans">
			<div class="group-list5 none-bg add" v-show="groupShow[5].isAdd" @click = "turnBall(userGroup[5],5)" >
				<router-link :to="{path:'../filter',name:'filter',params:{batchId:'',fileAddr:''}}" class="add-icon"><img src="../common/img/filter.png" title="筛选后导入"></router-link>
				<router-link  :to="{path:'../upload'}" class="add-icon"><img src="../common/img/upload.png" title="批量导入"></router-link>
			</div>
		</transition>
		<transition name="user-trans">
			<div class="group-list5 list5-bg " v-show="groupShow[5].isDes" @click = "turnBall(userGroup[5],5)" >
				<h5 class="list5-title ">{{userGroup[5]?userGroup[5].name:''}}</h5>
				<div class="list5-desc ">{{userGroup[5]?userGroup[5].desc:''}}</div>
				<div class="icon5-group">
					<router-link :to="{name:'check',path:'../check',params:{batchId:(userGroup[5]&&userGroup[5].batchId),users:(userGroup[5]&&userGroup[5].users)}}" class="check-icon">
						<img src="../common/img/check.png" title="查看对比结果" >
					</router-link>
					<router-link  :to="{name:'filter',path:'../filter',params:{batchId:(userGroup[5]&&userGroup[5].batchId),fileAddr:(userGroup[5]&&userGroup[5].fileAddr)}}"  class="check-icon" v-show="userGroup[5] && userGroup[5].createType">
						<img src="../common/img/tiaozheng.png" title="修改筛选指标" >
					</router-link>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	//import userList from "./user-list"
	export default {
		components:{
		},
		props:{
			userGroup:{
				type:Array,
				default:[]
			}
		},
		mounted(){
			//console.log(this.userGroup[0].name)
		},
		data(){
			return{
				groupShow:[],
			}
		},
		computed:{
			isUpdate(){
				let arr = []
				this.userGroup.forEach( (element, index) =>{
					arr.push(element.createType)
				});
				return arr
			}
		},
		methods:{
			turnBall(item,index){
				
				if(item){
					this.groupShow[index].isDes = this.groupShow[index].isDes == true?false:true
				}
				this.groupShow[index].isAdd = this.groupShow[index].isAdd == true?false:true
			}
		},
		watch:{
			userGroup(){
				for(let i=0;i<6;i++){
					this.groupShow.push({
						isAdd:false,
						isDes:false
					})
				}
			}
		},
		created(){
			for(let i=0;i<6;i++){
				this.groupShow.push({
					isAdd:false,
					isDes:false
				})
			}
		}
	}
</script>
<style >
	.user-trans-enter-active,.user-trans-leave-active{
		transition: all 0.3s
	}
	.user-trans-enter,.user-trans-leave-to{
		transform: translateX(30%);
	}
	.group-content{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.group-content>div{
		position: absolute;
		text-align: center;
		border-radius: 50%;
		display: flex;
		flex-direction:column;
		justify-content: center;
	}
	.group-list0{
		width: 280px;
		height: 280px;
		top:0px;
		left: 200px;
	}
	.group-list1{
		width: 220px;
		height: 220px;
		display: flex;
		flex-direction:column;
		justify-content: center;
		top:200px;
		left: 400px;
	}
	.group-list2{
		width: 200px;
		height: 200px;
		top:50px;
		left:600px;
	}
	.group-list3{
		width: 160px;
		height: 160px;
		top:300px;
		right:250px;
	}
	.group-list4{
		width: 160px;
		height: 160px;
		top:60px;
		right:150px;
	}
	.group-list5{
		width: 160px;
		height: 160px;
		top:300px;
		left:150px;
	}
	.list0-bg{
		background-color: #db6547 !important;
	}
	.list1-bg{
		background-color: #db9b36 !important;
	}
	.list2-bg{
		background-color: #ce8550 !important;
	}
	.list3-bg{
		background-color: #ce6550 !important;
	}
	.list4-bg{
		background-color: #b34a7e !important
	}
	.list5-bg{
		background-color: #cf8055 !important;
	}
	.none-bg{
		background-color: #464e5b;
	}

	.add-icon{
		width: 40%;
		height:30px;
		line-height: 30px;
		
		text-align: center;
		align-self:center;
	}
	.group-content>.add{
		display: flex;
		flex-direction:row;
		justify-content:center;
	}
	.list0-title{
		padding: 10px 0;
		margin-bottom:20px;
	}
	.list0-desc{
		padding: 5px 10px;
		height: 80px;
		width: 80%;
		margin: 0px auto;
		overflow: hidden;
  		text-overflow: ellipsis;
  		font-size: 12px;
	}
	.icon0-group{
		margin-top:10px; 
		height: 30px;
	}
	.check-icon{
		display: inline-block;
		width: 30%;
		height: 30px;
		background: transparent;
    	border: none;
	}
	.list1-title{
		padding: 10px 0;
		margin-top:10px;
	}
	.list1-desc{
		padding: 5px 10px;
		height: 60px;
		width: 80%;
		margin: 0px auto;
		overflow: hidden;
  		text-overflow: ellipsis;
  		font-size: 12px;
	}
	.icon1-group{
		/*margin-top:10px; */
		height: 30px;
	}
	.list2-title{
		padding: 10px 0;
		margin-top:10px;
	}
	.list2-desc{
		padding: 5px 10px;
		height: 60px;
		width: 80%;
		margin: 0px auto;
		overflow: hidden;
  		text-overflow: ellipsis;
  		font-size: 12px;
	}
	.icon2-group{
		/*margin-top:10px; */
		height: 30px;
	}
	.icon2-group img{
		height:28px;
		width: 32px
	}
	.list3-title,.list4-title,.list5-title{
		padding: 10px 0;
		margin-top:10px;
	}
	.list3-desc,.list4-desc,.list5-desc{
		padding: 5px 10px;
		height: 40px;
		width: 80%;
		margin: 0px auto;
		overflow: hidden;
  		text-overflow: ellipsis;
  		font-size: 12px;
	}
	.icon3-group,.icon4-group,.icon5-group{
		/*margin-top:10px; */
		height: 20px;
	}
	.icon3-group img,.icon4-group img,.icon5-group img{
		height:20px;
		width: 25px
	}
</style>