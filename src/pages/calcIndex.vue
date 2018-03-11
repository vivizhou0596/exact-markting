<template>
	<div>
		<ul class="nav-bar">
	        <router-link :to="{path:'index'}" tag="li" ><img src="../common/img/ins-icon.png" alt="">客户洞察</router-link>
	        <router-link :to="{path:'calcIndex'}" tag="li" style="background-color:#4296DD;"><img src="../common/img/asse-icon.png" alt="">营销测算</router-link>
	    </ul>
		<div class="container-box">
			
			<div class="container">
				<h1 class="index-title">开启营销活动测算？</h1>
				<router-link :to="{path:'calcGroup'}" class="calc-result" tag="p">我的测算结果</router-link>
				<router-link :to="{path:'makeCalc'}" class="make-calc" tag="p">我要开始测算</router-link>
				<input type="text"  v-model="userName" style="display:none">
			</div>
		</div>
	</div>
</template>
</template>
<script>
	
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
	    margin-top: -200px;
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
	.make-calc{
		width: 230px;
		height: 230px;
		line-height: 230px;
		text-align: center;
		background-color:#4684e9; 
		border-radius: 50%;
		position: absolute;
		top:20%;
		left:40px;
		font-size:22px;
		cursor: pointer;
	}
	.calc-result{
		width: 230px;
		height: 230px;
		line-height: 230px;
		text-align: center;
		background-color:#01c0c8; 
		border-radius: 50%;
		position: absolute;
		top:20%;
		right: 40px;
		font-size:20px;
		cursor: pointer;
	}
</style>