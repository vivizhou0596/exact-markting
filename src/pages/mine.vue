<template>
	<div class="container-box">
		<div class="container">
			<router-link  :to="{path:'../index'}" class="back" ><img src="../common/img/back.png" ></router-link>
			<!-- <div @click="routerBack" class="back" v-show="flag=='2'?true:false"><img src="../common/img/back.png" alt="返回" ></div> -->
			<div class="search-box">
				<input type="text" class="" placeholder="请输入要搜索的内容" v-model="search">
				<button type="button" @click="searchUser" class="search-btn"><img src="../common/img/search.png" alt="搜索"></button>
			</div>
			<div class="slide">
				<!-- <slide-show ></slide-show> -->
				<div class="slide-show">
				    <div class="slide-img">
				        <transition name="slide-trans">
				          <user-group v-if="isShow" :userGroup="slides"></user-group>
				        </transition>
				        <transition name="slide-trans">
				          <user-group v-if="!isShow" :userGroup="slides"></user-group>
				        </transition>
				    </div>
				    <div class="slide-prev"  @click="current-- && goto(current)"  v-show="current != 1" v-if="isbtnShow">
				      <img src="../common/img/ARROW-left.png" alt="">
				    </div>
				    <div class="slide-next" v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)" v-if="isbtnShow">
				      <img src="../common/img/ARROW-right.png" alt="">
				    </div>
				    <div class="mine-footer" >* 用户群数据仅存3个月，请合理运用！</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import UserGroup from '../components/user-group'
	import axios from 'axios'
	import message from 'vue-multiple-message'
	import {getUserGroup} from 'api/targets'
	export default{
		components:{
			UserGroup
		},
		data(){
			return{
				search:'',
				isShow:true,
				searchVal:'',
				current:1,
				showItem:6,
				allpage:0,
				slides:[]
			}
		},
		computed:{
		    isbtnShow(){
		      if(this.allpage < 2){
		        return false
		      }
		      else{
		        return true
		      }
		    }
		},
		methods:{
			searchUser(){
				this.$router.push({
					path:'/mine/search',
					name:'search',
					params: { search: this.search }
				})
			},
			_loadList(searchVal,current,pageSize){
		        getUserGroup(current,pageSize,searchVal).then(({resultCode,resultContent})=>{
		        	//console.log(resultContent)
		        	if(resultCode === '001'){
		              this.current = resultContent.currentPageNum 
		              this.allpage = resultContent.totalPageNum
		              this.slides = resultContent.data
		              //console.log(this.current,this.allpage,this.slides)
		            }else if(resultCode === '009'){
		            	this.$router.push({
				            path:'./fail',
				            name:'fail',
				            params:{msg:resultContent}
				        })
		            }else{
		              message.error('数据请求失败，请稍后重试')
		              return
		            }
		        }).catch((err)=>{
		          	message.error('数据请求失败，请稍后重试')
		            console.error(err)
		        })
		    },
			goto(index){//这里可以发送ajax请求
		        this.isShow = false
		        setTimeout(()=>{
		          this.isShow = true
		          this._loadList(this.searchVal,index,this.showItem)
		        },20)
		        //console.log(index)
		    }
		},
		beforeRouteEnter(to, from, next) {
		    if (from.path === '/mine/search') {
		      to.meta.keepAlive = true
		    } else {
		      to.meta.keepAlive = false
		    }
		    next()
		},
		mounted(){
		    setTimeout(()=>{
		        this._loadList(this.searchVal,this.current,this.showItem)
		    },20)
		}
		
	}
</script>
<style scoped>
	.container-box{
		width: 100%;
		height:100%;
		position: relative;
	}
	.container{
		margin: 0px auto;
		width: 1400px;
		height:700px;
		position: absolute;
		top:50%;
		left:50%;
		/*transform: translate(-50%,-50%);*/
		margin-top: -300px;
		margin-left: -700px;
		display: flex;
    	flex-direction:column;
    	justify-content:center;
	}
	.back{
		width: 50px;
		height: 50px;
		position: absolute;
		top:40px;
		left: 50px;
	}
	.search-box{
		position: absolute;
		top:40px;
		right:50px;
	}
	.search-box>input{
		background: transparent;
		border:1px solid #606875;
		width: 300px;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		padding: 0 20px;
		color: #6b727f;
		font-size: 12px;
	}
	.slide{
		width: 1200px;
		height: 500px;
		margin: 0px auto;
		position: relative;
	}
	
	.search-btn{
		border: none;
		background: transparent;
		position: absolute;
		top:5px;
		right: 20px;
	}
	.slide-trans-enter-active {
	  transition: all .5s;
	}
	.slide-trans-enter {
	  transform: translateX(1200px);
	}
	.slide-trans-old-leave-active {
	  transition: all .5s;
	  transform: translateX(-1200px);
	}
	.slide-show {
	  position: relative;
	  margin: 15px 15px 15px 0;
	  width: 1200px;
	  height: 500px;
	  overflow: hidden;
	}
	.slide-show h2 {
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  color: #fff;
	  background: #000;
	  opacity: .5;
	  bottom: 0;
	  height: 30px;
	  text-align: left;
	  padding-left: 15px;
	}
	.slide-img {
	  width: 100%;
	}
	.slide-prev{
	  position: absolute;
	  top:250px;
	  left:20px;
	}
	.slide-next{
	  position: absolute;
	  top:250px;
	  right:20px;
	}
	.mine-footer{
	    width: 1200px;
	    margin: 0px auto;
	    color:#6a727f;
	    font-size:14px;
	    position:absolute;
	    bottom:0;
	    left:0;
	    height:20px;
	    line-height:20px;
	    color:#ffa500;
	  }
</style>