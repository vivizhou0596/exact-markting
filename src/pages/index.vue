<template>
	<div>
		<ul class="nav-bar">
	        <router-link :to="{path:'index'}" tag="li" style="background-color:#4296DD;"><img src="../common/img/ins-icon.png" alt="">客户洞察</router-link>
	        <router-link :to="{path:'calcIndex'}" tag="li"><img src="../common/img/asse-icon.png" alt="">营销测算</router-link>
	        <!-- <router-link :to="{path:'index'}" tag="li"><img src="../common/img/calc-icon.png" alt="">营销评估</router-link> -->
	    </ul>
		<div class="container-box">
			<div class="container">
				<h1 class="index-title">您要洞察用户群的操作是？</h1>
				<router-link :to="{path:'upload'}" class="upload" tag="p">导入用户群洞察</router-link>
				<router-link :to="{path:'filter'}" class="filter" tag="p">筛选用户群洞察</router-link>
				<router-link :to="{path:'mine'}" class="mine" tag="p">我的用户群洞察</router-link>
				<input type="text"  v-model="userName" style="display:none">
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default{
	data(){
		return{
			userName:''
		}
	},
  beforeRouteLeave(to, from, next){
	  console.log("首页to"+to.path)
    to.meta.keepAlive = false; // 让 A 不缓存，即刷新
    next();
  },
	created(){
		axios.get('build/getCurrentUser').then((res)=>{
				let resultCode = res.data.resultCode
				let resultContent =  res.data.resultContent
				if(resultCode=='001'){
					console.log(resultContent)
					this.userName = resultContent
					//return
				}else if(resultCode=='009'){
					console.log('超时了')
					this.$router.push({
		        		path:'./fail',
		        		name:'fail',
		        		params:{msg:resultContent}
		        	})
				}else{
					console.log(resultContent)
					return
				}
			}).catch((err)=>{
				console.log(err)
				return
			})
	}
}
</script>
<style scoped>
	.nav-bar{
	    padding-bottom:40px;
	    display: flex;
		justify-content: flex-start;
	}
  .nav-bar>li{
    flex-grow:1;
    padding:15px 0;
    font-size:18px;
    background-color: #457EDA;
    text-align: center;
	cursor: pointer;
	background-repeat: no-repeat;
  }
  .nav-bar>li img{
  	vertical-align: top;
  	margin-right: 10px;
  }
	.container-box{
		width:1200px;
		position: absolute;
	    top: 48%;
	    left: 50%;
	    margin-left: -600px;
	    margin-top: -220px;
	}
	.container{
		width: 500px;
		height: 500px;
		margin: 0px auto;
		position: relative;
	}
	.index-title{
		text-align: center;
		font-size: 22px;
		margin-top:10px;
	}
	.upload{
		width: 260px;
		height: 260px;
		line-height: 260px;
		text-align: center;
		background-color:#4684e9;
		border-radius: 50%;
		position: absolute;
		top:10%;
		left: 20px;
		font-size:22px;
		cursor: pointer;
	}
	.filter{
		width: 230px;
		height: 230px;
		line-height: 230px;
		text-align: center;
		background-color:#01c0c8;
		border-radius: 50%;
		position: absolute;
		top:20%;
		right: 20px;
		font-size:20px;
		cursor: pointer;
	}
	.mine{
		width: 190px;
		height: 190px;
		line-height: 190px;
		text-align: center;
		background-color:#db7e63;
		border-radius: 50%;
		position: absolute;
		bottom:30px;
		left: 25%;
		font-size:18px;
		cursor: pointer;
	}
</style>
