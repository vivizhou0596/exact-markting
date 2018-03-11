<template>
<div id="mine-search">
	<div class="clearfix nav-bar">
		<a class="pull-left back" @click="goback" key="addBack"></a>
      <input type="text" class="pull-right search-input" placeholder="搜索指标名称" v-model="searchVal"/>
      <button type="button" class="search-btn pull-right" @click="search">
        <img src="../common/img/search.png" alt="搜索">
      </button>
    </div>
	<div class="search-list">
		<ul>
			<li class="item" v-for="item in slideList">
				<div class="item-content">
					<h1>{{item && item.name}}</h1>
					<p>{{item && item.desc}}</p>
				</div>
				<div class="item-icon">
					<router-link :to="{name:'check',params:{ batchId:(item&&item.batchId),users:(item&&item.users)},path:'../check'}" 
					 class="check-icon" >
						<img src="../common/img/check.png" >
					</router-link>
					<router-link  
						:to="{name:'filter',path:'../filter',params:{ batchId:(item&&item.batchId),fileAddr:(item&&item.fileAddr) }}"
						v-show="item.createType">
						<img src="../common/img/tiaozheng.png" >
					</router-link>
				</div>
			</li>
		</ul>
		<!-- <my-pagination  :showItem='showItem'  @page-change="freshList"></my-pagination> -->
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
	import myPagination from "../components/pagination"
	import ClacPagination from './calc/clac-pagnation'
	import {SET_PAGENITION_CURR, SET_PAGENITION_TOTAL} from 'store/mutation-types'
	import {mapState, mapMutations} from 'vuex'
	import axios from 'axios'
	import message from 'vue-multiple-message'
	import {fake} from 'api/targets'
	import $ from 'jquery'
	export default{
		components:{
			myPagination,
			ClacPagination
		},
		data(){
			return {
				nowIndex:0,
				searchVal:'',
            	showItem:4,
				slideList:[],
				currentPage:1,
	            allpage:13,
			}
		},
		computed:{
			// ...mapState(['current', 'allpage'])
		},
		methods:{
			...mapMutations([SET_PAGENITION_CURR,SET_PAGENITION_TOTAL]),
			goback(){
				this.$router.push({
			        path: '/mine'
			    })
			},
			search(){
				let current = 1
				let batchName = sessionStorage.getItem("searchVal")
				if(this.searchVal == batchName){ return }
				sessionStorage.setItem("searchVal",this.searchVal) 
				batchName = sessionStorage.getItem("searchVal")
				//this.loadList(batchName,current,this.showItem)
				this.freshList(batchName,current,this.showItem);//渲染图表
			},
			freshList(searchVal,current,pageSize){
				searchVal = sessionStorage.getItem("searchVal")
				//console.log(searchVal)
	    		let context = this
	    		let ajaxData = 'currentPage='+current+'&everyPage='+pageSize+'&batchName='+encodeURI(searchVal)
	    		//let ajaxData ='measureName='+searchVal+'&everyPage='+pageSize+'&currentPage='+current 
	    		let url = fake =='dev'?'static/getUserGroup.json':'build/getUserGroup'//fake是从targets.js引入的全局变量控制开发与生产模式的
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
				   		//console.log(resultContent)
				   		if(resultCode == '001'){
				   			context.currentPage = resultContent.currentPageNum
				   			context.allpage = resultContent.totalPageNum
				   			context.slideList = resultContent.data
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
			}
		},
		beforeRouteEnter(to, from, next) {
			if (from.path === '/check') { // 如果是从对比页面来，则缓存
				to.meta.keepAlive = true
			} else if( from.path === '/mine'){ // 如果由其它页面进来，则刷新
				to.meta.keepAlive = false
				sessionStorage.setItem("searchVal",to.params.search)
			}else{
				to.meta.keepAlive = false
				sessionStorage.setItem("searchVal",'')
			}
		    next()
	  	},
		mounted(){
			setTimeout(()=>{
				let current = 1
				this.searchVal = sessionStorage.getItem("searchVal")
				this.freshList(this.searchVal,this.currentPage,this.showItem);//渲染图表
				//this.loadList(this.searchVal,current,this.showItem)
			},20)
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
		height: 126px;
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
</style>