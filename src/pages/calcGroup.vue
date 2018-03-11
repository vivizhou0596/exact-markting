<template>
<div id="mine-search">
	<div class="clearfix nav-bar">
		<a class="pull-left back" @click="goback" key="addBack"></a>
      <input type="text" class="pull-right search-input" placeholder="搜索指标名称" v-model="searchVal"/>
      <button type="button" class="search-btn pull-right" @click="search()" >
        <img src="../common/img/search.png" alt="搜索">
      </button>
    </div>
	<div class="search-list">
		<ul>
			<li class="item"  v-for="item in calcGroupVal">
				<div class="item-content">
					<h1>{{item.calcName}}</h1>
					<p>测算群编号：{{item.batchNo}}</p>
					<p>创建时间：{{item.createTime}}</p>
				</div>
				<div class="item-icon">
					<a class="check-icon"  href="javascript:void(0)" @click="checkCalaResult(item.batchNo)">
						<img src="../common/img/check.png" >
					</a>
				</div>
			</li>
		</ul>
		<div class="mine-footer" >* 用户群数据仅存3个月，请合理运用！</div>
		<clac-pagination  
			@page-change="freshList('',$event,showItem)" 
			:currentPage="currentPage" 
			:showItem="showItem" 
			:allpage="allpage">
		</clac-pagination>
	</div>
	
</div>
</template>
<script>
import ClacPagination from '../components/calc/clac-pagnation'
import message from 'vue-multiple-message'
import $ from 'jquery'
import {fake} from 'api/targets'
export default{
	components:{ClacPagination},
	data(){
          return{
            currentPage:1,
            showItem:5,
            allpage:13,
            searchVal:'',
            calcGroupVal:[],
            fromPath:'',
            //fake:'prod'//切换模式，‘dev’开发模式，'prod'生产模式
          }
    },
    methods:{
    	freshList(searchVal,current,pageSize){
    		let context = this
    		let ajaxData ='measureName='+searchVal+'&everyPage='+pageSize+'&currentPage='+current 
    		let url = fake =='dev'?'static/getCalcList.json':'measure/getMeasureResult'//fake是从targets.js引入的全局变量控制开发与生产模式的
    		let ajaxType = fake =='dev'?'get':'post'//fake是从targets.js引入的全局变量控制开发与生产模式的
    		//console.log(url)
    		$.ajax({
				url:url,
				async: false,
				type:ajaxType,
				data:ajaxData,
				success:function(res){
					//console.log(res)
					const result = fake =='dev'?res:JSON.parse(res)//fake是从targets.js引入的全局变量控制开发与生产模式的
					const resultCode = result.resultCode
			   		const resultContent = result.resultContent
			   		console.log(resultContent)
			   		if(resultCode == '001'){
			   			context.currentPage = resultContent.currentPageNum
			   			context.allpage = resultContent.totalPageNum
			   			context.calcGroupVal = resultContent.data
			   			//context.dataConfig(resultContent)
			   		}else if(resultCode == '009') {
			        	this.$router.push({
			        		path:'./fail',
			        		name:'fail',
			        		params:{msg:resultContent}
			        	})
				    }else{
			   			console.log(resultContent)
			   			message.error('数据请求失败，请稍后重试')
			   		}
				},
				error:function(err){
					console.log(err)
					message.error('数据请求失败，请稍后重试')
				}
			})
    	},
    	checkCalaResult(num){
    		this.$router.push({
				path:'/calcResult',
  				name:'calcResult',
  				params: { batchNo:num,action:'result'}
			})
    	},
    	search(){
    		//console.log(this.searchVal)
    		this.freshList(this.searchVal,this.currentPage,this.showItem);//渲染图表
    	},
        goback(){
        	this.$router.push({
				path:'/calcIndex',
 				name:'calcIndex',
			})
		}
    },
    mounted(){
	    this.freshList(this.searchVal,this.currentPage,this.showItem);//渲染图表
    },
    beforeRouteEnter(to, from, next) {
		next(vm=>{
			vm.fromPath = from.path
		})
	}
}
</script>
<style scoped>
	#mine-search{
		position: relative;
		/*padding: 110px 75px 95px;*/
		width: 100%;
		height: 100%;
		background-color: #3c4451;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		/*align-items: center;*/
		justify-content: center;
	}
	.nav-bar .back {
		width: 40px;
		height: 40px;
		background-image: url('../assets/imgs/back.png');
		background-size: 40px 40px;
		background-position: center;
		background-repeat: no-repeat;
		display: inline-block;
		cursor: pointer;
	}
	.nav-bar {
	 	width: 1200px;
	 	padding: 20px 0px;
		margin:0px auto;
		position: relative;
	}
	.nav-bar .search-input {
	  width: 200px;
	  background-color: #3c4451;
		padding: 6px 15px;
	  border: 2px solid #848c98;
	  color: #e0e0e0;
		font-size: 14px;
	  border-radius: 21px;
	  margin-left: 20px;
	  position: relative;
	}
	.nav-bar .search-btn{
	  border: none;
	  background: transparent;
	  position: absolute;
	  top:25px;
	  right:20px;
	}
	.disabled { pointer-events: none; }
	.search-list{
		width:900px;
		height:600px;
		margin: 0px auto;
	}
	.search-list>ul{
		height:550px;
	}
	.item{
		width:880px;
		height:90px;
		border-radius: 10px;
		background-color: #4f5763;
		margin:10px auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between; 
		align-items: center;
		padding:20px 50px; 
	}
	.item-content{
		width: 500px;
		height: 70px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.item-content h1{
		font-size: 16px;
		padding: 5px 10px;
	}
	.item-content p{
		font-size: 12px;
		padding: 5px 10px;
	}
	.item-icon{
		width: 200px;
		text-align: right;
	}
	.pagination{
		text-align: center;
	}
	.pagination li{
		display: inline-block;
		padding: 5px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		margin: 0px 5px;
	}
	.pagination .on{
		background-color: #417f46;
	}
	.mine-footer{
	    width: 900px;
	    /*margin: 0px auto;*/
	    color:#6a727f;
	    font-size:14px;
	    position:absolute;
	    bottom:0;
	    left:0;
	    height:20px;
	    line-height:20px;
	    color:#ffa500;
	    margin-left: 100px;
	    margin-bottom: 20px;
	  }
</style>