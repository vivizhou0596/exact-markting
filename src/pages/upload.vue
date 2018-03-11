<template>
  <div class="container-box">
    <!--文件上传部分-->
    <!-- <router-link :to="{path:'index'}" class="back"><img src="../common/img/back.png" alt="返回"></router-link> -->
    <a class="back"><img @click="goback"  src="../common/img/back.png" alt="返回"></a>
    <div  class="container">
      <div class="uploadDiv">
		<label class="input-label"><span class="Asterisk">* </span>上传文件:</label>
          <div class="browseDiv" >
          	<span>{{uploadFileName}}</span>
			 <button type="button" @click="lookup" class="liulan-btn">浏览</button>
          </div>
          <input type="file" name="fileToUpload"    ref="file"  @change="fileSelected" style="display:none;"/>
      </div>

      <div class="uploadDiv">
      	<label class="input-label"><span class="Asterisk">* </span>用户群名称:</label>
      	<input type="text"
      			class="uploadInput"
      	       v-model="userGroupName" 
      	       placeholder="请为您上传的用户群命名"
      	       ref = "batchName"
      	>
      </div>
      <div class="ps-text">
        <p > 限定大小:不能超过200MB</p>
        <p > 支持格式:txt,若有疑问,请点击<a href="build/downSample" style="color:#2765cb;cursor: pointer;">示例</a>下载进行参考</p>
      </div>
      <div class="uploadButton">
        <a type="button" @click.prevent="uploadFile" class="up-btn">上传</a>
      </div>
    </div>

    <!--进度条部分-->
    <my-dialog :is-show="isShowDialog" @on-close="closeDialog">
	    <div  class="progress-content">
	      <div class="progress-top">
	        <div class="progress-text">
		        <span class="progress-name">{{userGroupName}}&nbsp;&nbsp;</span>
		        <span class="progress-num" ref="proNum">(&nbsp;{{fileSize}}KB&nbsp;)&nbsp;&nbsp;{{isOpr?operatNum:progressNumber}}%&nbsp;</span>
		        <span class="cancel-btn" @click="uploadCanceled" >取消上传</span>
	        </div>
	      </div>
	      <div class="app-bar-content">
	      	<div class="pro-active" ref="proAct"></div>
	      	<div class="pro-line"></div>
	      	<ul class="progress-bar">
		        <li class="cirl-on"><img :src="proBtn.tickUrl" alt=""></li>
		        <li :class="[isSucc === 0 ?'cirl-in': isSucc === 1 ?'cirl-on' :'cirl-fail']" ref="pro2">
		        	<img :src="[isSucc ===0||isSucc===1?proBtn.tickUrl:proBtn.closeUrl]" v-show="isSucc">
		        </li>
		        <li :class="[isFre === 0 ?'cirl-in': isFre === 1 ?'cirl-on' :'cirl-fail']">
		        	<img :src="[isFre ===0||isFre===1?proBtn.tickUrl:proBtn.closeUrl]" v-show="isFre">
		        </li>
		     </ul>
		     <ul class="progress-bar-txt">
		        <li >上传</li>
		        <li >{{isSucc ===0?'': isSucc===1?'处理' : '失败'}}</li>
		        <li>{{isFre ===0?'': isFre===1?'完成' : '失败'}}</li>
		     </ul>
	      </div>
	     
		  <div class="result">
		  	<a :class="[isFre ===0 ? 'wait-btn' : 'up-btn']" @click="uploadResult">{{buttonText}}</a>
		  	<!-- <a class="up-btn" @click="uploadResult">{{buttonText}}</a> -->
			<p  class="result-text"><span class="Asterisk">* </span><span v-html="resultText"></span></p>
		  </div>
	    </div>
    </my-dialog>
    
  </div>
</template>

<script>
import myDialog from '../components/base/dialog'
import axios from 'axios'
import $ from 'jquery'
import message from 'vue-multiple-message' // 引入 message 组件，用于弹出提示信息
  export default {
  	components:{
  		myDialog
  	},
  	data(){
      return{
        uploadFileName:"",//上传文件的名字
        userGroupName:"",//用户群名称
        fileSize:0,      //上传文件大小
        progressNumber:0,//上传进度
        //uploadComplet:false, //是否上传完成
        buttonText:"上传...", //上传结果按钮文字
        resultText:"正在处理，请耐心等待 （耗时约2-4分钟）", //上传结果反馈提示
        isShowDialog:false,//控制遮罩显示
        isSucc:0,//判断文件上传状态，0初始值，1成功，2失败
        isFre:0,//判断用户群存储状态，0初始值，1成功，2失败
        isOpr:0,//判断是否处于数据入库处理状态0否，1处理
        operatNum:0,
        batchId:'',
        users:'',
        proBtn:{
        	tickUrl:require("../common/img/TICK.png"),
        	closeUrl:require("../common/img/CLOSE.png")
        }
      }
    },
    watch:{
    	progressNumber(val){
    		let width=parseInt(val/2)+'%'
    		this.$refs.proAct.style.width = width
    		if(val == 100){
    			this.isSucc=1
    			this.isOpr = 1
    			this.runInv()
    			//this.$refs.proNum.innerHTML = '正在处理...'
    		}
    		let lisenW =parseInt(this.$refs.proAct.style.width)
    		//console.log(  lisenW )
    		if(lisenW > 98){
    			clearInterval(this.inId)
    		}
    	}
    },
    methods:{
    	goback(){
    		this.$router.go(-1)
    	},
    	closeDialog(msg){
	      this.isShowDialog = false
	    },
      //浏览文件
      lookup(){
        this.$refs.file.click();
        console.info("浏览事件触发");
      },
      //文件选择事件
      fileSelected(event) {
        console.info("文件选择事件触发");
        let file = this.$refs.file.files[0];
        if (file) {
            let fileSize = 0;
            let regExp = /^.*\.(txt)$/i
            if(!regExp.test(file.name)){
          	   message.warning("上传文件格式不合规定");
          	    this.$refs.file.files = null
          	    return
            }
            fileSize = (Math.round(file.size * 100 /1024) / 100).toString(); 
            //console.log(fileSize)
	        if(fileSize>200*1024){
	          message.warning("上传的文件超过200M");
	          this.$refs.file.files = null
	          return
	        }
            this.uploadFileName=file.name;
            this.fileSize=fileSize;
        }
      },
      //上传方法
      uploadFile() {
        if(!this.uploadFileName){
          message.warning("请选择上传文件");
          return;
        }
       var  userGroupName =this.userGroupName;
        if(!userGroupName){
          message.warning("请输入参数");
          return;
        }
        this.isShowDialog = true
        var formData = new FormData();

        formData.append("fileToUpload", this.$refs.file.files[0])
        formData.append("batchName", this.userGroupName)
        let me = this
        window.addEventListener('beforeunload',function(){
	        axios({
		        url:'build/reloadData',
		        method:'get',
		        async:false
	    	}).then((res)=>{
	    		//console.log(res)
	    	}).catch((err)=>{
			  console.log(err)
			})
        },false)
        window.addEventListener('hashchange', function() {//捕获浏览器后退事件，hash值改变地址栏#/之后的内容
            //为当前导航页附加一个tag
            this.history.replaceState('hasHash', '', '');
            //console.log('监听到返回')
            window.location.reload()
        }, false);
        /**********向后台发请求***********/
        axios({
	        url:'build/uploadData',
	        method:'post',
	        data:formData,
	        //timeout:5*60*1000,
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        maxContentLength:2000,
	        onUploadProgress(event){
	        	me.uploadProgress( event );
	        },
    	}).then((res)=>{
    		me.uploadComplete(res);//调用上传完成处理函数
    	}).catch((err)=>{
			  message.error(err.resultContent)
			  this.isShowDialog = false
		})
        
      },
      uploadProgress(e) {//上传进度
      	if (e.lengthComputable) {
          var percentComplete = Math.round(e.loaded * 100 / e.total);
          this.progressNumber =percentComplete;
        }
      },
      runInv(){//模拟上传进度
			this.inId=setInterval(()=>{
				this.progressNumber += 1 
				this.operatNum += 1
			},2400)
		},
      uploadComplete(res) {//处理完成
        let result = res.data
        if (result.resultCode == '001') { //成功
        	clearInterval(this.inId)
        	this.$refs.proAct.style.width =100+'%'
			this.operatNum = 100
			this.isFre = 1
			this.batchId = result.resultContent.batchId
			this.batchUsers = result.resultContent.users
            this.buttonText="查看结果";
            this.resultText='恭喜导入完成，本次<span style="color:#e75455">共导入'+result.resultContent.allUsers+'</span>用户，其中<span style="color:#e75455">有效用户数'+result.resultContent.effectiveUsers+'</span>，点击查看洞察结果!';
        }else if(result.resultCode == '009') {
        	this.$router.push({
        		path:'./fail',
        		name:'fail',
        		params:{msg:result.resultContent}
        	})
        }else {//失败处理
        	message.error(result.resultContent)
        	clearInterval(this.inId)
        	this.isShowDialog = false
        }
      },
      uploadCanceled(){ //取消上传
      	this.uploadFileName = ''
      	this.userGroupName = ''
      	clearInterval(this.inId)
      	axios.get('build/closeUploadData')
			  .then((result)=>{
			  	let res = result.data
			    //console.log(res);
			    if(res.resultCode == '001'){
			    	//message.success(res.resultContent)
			    	this.isShowDialog = false
			    }else if(result.resultCode == '009') {
		        	this.$router.push({
		        		path:'./fail',
		        		name:'fail',
		        		params:{msg:result.resultContent}
		        	})
		        }else{
			    	message.warning(res.resultContent)
			    }
			  })
			  .catch((err)=>{
			  	console.log(err)
			  	clearInterval(this.inId)
			  	this.isShowDialog = false
			    message.error(err.resultContent)
			  });
      },
      uploadResult(){//上传结果点击按钮事件
      	this.isShowDialog = false
      	// this.isFre  = 1//测试桩记得删除
      	// console.log(this.isFre)
        if(this.isFre == 1){//查看结果
        	this.$router.push({
        		path:'./check',
        		name:'check',
        		params:{batchId:this.batchId,users:this.batchUsers}
        	})
        }else{//重新上传
        	this.$forceUpdate()
        }
      }
    },
    beforeDestroy() {
		window.removeEventListener('hashchange', this.uploadComplete, false)
		window.removeEventListener('beforeunload', this.uploadComplete, false)
	}
  }

</script>

<style scoped>
	.container-box{
	    width: 100%;
	    height: 100%;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	}
  .container{
  	margin: 0px auto;
	width: 640px;
	height:400px;
	position: relative;
  }
  .back{
  	width: 1200px;
  	margin:0px auto;
  	/*position: absolute;
  	top:20%;
  	left:20%;*/
  }
  .uploadDiv{
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	margin:30px 0;
  }
	.input-label{
		font-size: 14px;
		color:#a9a9a9;
	}
	.browseDiv {
	    background: #606a7b;
	    height: 50px;
	    width: 540px;
	    border-radius:25px;
	    padding:0 30px;
	    margin-left: 20px;
	    position: relative;
	    line-height: 50px;
	  }
	.liulan-btn{
		height: 50px;
	    width: 114px;
	    border-radius:25px;
	    background-color: #4684e9;
	    border: none;
	    color:#fff;
	    position: absolute;
	    top:0px;
	    right: 0px;
	    cursor: pointer;
	}
	.uploadInput {
	    background: transparent;
	    height: 40px;
	    width: 320px;
	    border-radius:20px;
	    border: 1px solid #565f6d;
	    padding: 0px 30px;
	    margin-left: 10px;
	    color: #fff;
	 }
	.ps-text{
		margin-top: 60px;
		color: #6a727f;
		margin-left: 95px;
	}
	.ps-text p{
		padding:5px 0px; 
	}
	.uploadButton {
	    text-align: center;
	    margin-top: 30px;
  	}
	.up-btn{
		height: 50px;
	    width: 150px;
	    border-radius:25px;
	    background-color: #4684e9;
	    border: none;
	    color:#fff;
	    font-size: 22px;
		box-shadow: 0px 5px 0px #2765cb;
		display:inline-block;
		line-height:50px;
		cursor:default;
	}
	.wait-btn{
		height: 50px;
	    width: 150px;
	    border-radius:25px;
	    background-color: #424a57;
	    border: none;
	    color:#fff;
	    font-size: 22px;
		box-shadow: 0px 5px 0px #39404b;
		pointer-events: none;
		display:inline-block;
		line-height:50px;
		cursor:default;
	}
	.progress-content{
		width:600px;
		height: 350px;
		position: relative;
	}
	.progress-text{
		font-size: 18px;
		color: #fff;
		display: flex;
		flex-direction: row;
  		align-items: center;
  		position: relative;
	}
	.progress-name{
		display: inline-block;
		max-width:200px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.progress-num{
		display: inline-block;
	}
	.cancel-btn{
		display: inline-block;
		background-color: #d74949;
		font-size: 12px;
		border-radius: 4px;
		padding: 2px;
		align-self: flex-end;
		position: absolute;
		top:0;
		right: 10px;
		cursor: default;
	}
	.app-bar-content{
		margin-top: 60px;
		height: 100px;
		position: relative;
	}
	.progress-bar{
		width:620px;
		height:50px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position:absolute;
		top:0;
		left:-2px;
		/*z-index: 100;*/
	}
	.progress-bar-txt{
		width:620px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position:absolute;
		top:-20px;
		left:-2px;
	}
	.progress-bar-txt li{
		width:28px;
	}
	.cirl-on{
		width:40px;
		height: 40px;
		border: 3px solid #2362cd;
		text-align: center;
		line-height: 40px;
		background-color: #4684e9;
		border-radius: 50%;
		z-index: 100;
	}
	.cirl-in{
		width:40px;
		height: 40px;
		border: 3px solid #39404b;
		text-align: center;
		line-height: 40px;
		background-color: #424a57;
		border-radius: 50%;
		z-index: 100;
	}
	.cirl-fail{
		width:40px;
		height: 40px;
		border: 3px solid #c73122;
		text-align: center;
		line-height: 40px;
		background-color: #ef5034;
		border-radius: 50%;
		z-index: 100;
	}
	.pro-line{
		width:580px;
		height: 10px;
		background-color: #424a57;
		position: absolute;
		left: 10px;
		top:20px;
		z-index: 10;
	}
	.pro-active{
		width: 50%;
		height: 10px;
		position: absolute;
		left:0px;
		top:20px;
		z-index:20;
		box-shadow: 2px 0px 5px #fff;
		background: linear-gradient(to right, rgba(70,132,233,1) 80%, rgba(255,255,255,1),rgba(70,132,233,1) )
	}
	.result{
		text-align: center;
		position: absolute;
		bottom: 0px;
		left: 50%;
		transform: translate(-50%,0);
		/*margin-top: 100px;*/
	}
	.result-text{
		margin-top: 30px;
	}
	.Asterisk{
		color:#e75455;
	}
</style>
