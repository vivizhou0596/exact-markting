<template>
	<div class="msg-content">
		<!-- <p class="msg-icon">×</p> -->
		<p><img src="../common/img/fail.png" alt=""></p>
		<p class="msg-text">
			<span>{{msg}}</span>
			<span class="msg-btn" @click="closeWin">点击确认</span>
		</p>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				msg:'登陆已失效，请通过经分重新登陆系统'
			}
		},
		created(){
			const params = this.$route.params
			if(params.msg){
				this.msg = params.msg
			}
		},
		methods:{
			closeWin(){
				window.location.href="about:blank";
  				window.close();
			}
		}
	}
</script>
<style>
	.msg-content{
		color: #676b72;
		text-align: center;
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.msg-text{
		display: inline-block;
		height: 80px;
		line-height: 80px;
		vertical-align: bottom;
	}
	.msg-btn{
		color: #4684e9;
		cursor: pointer;
	}
</style>
