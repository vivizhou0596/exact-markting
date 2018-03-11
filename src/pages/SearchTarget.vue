<template>
	<div id="search-target">
		<div class="clearfix nav-bar">
			<a class="pull-left back" @click="goback" key="addBack"></a>
	      <input type="text" class="pull-left search-input" placeholder="搜索指标名称" v-model="tagName"/>
	      <button type="button" class="search-btn" @click="search">
	        <img src="../common/img/search.png" alt="搜索">
	      </button>
	      <span class="statistics-date">
	        数据统计截止：<strong>{{dateTime}}</strong>
	      </span>
			<div class="pull-right">
				<button class="btn add" @click.prevent="saveOptionalTargets" type="button">添加</button>
				<button class="btn cancel" @click.prevent="cancelOptionalTargets" type="button">取消</button>
			</div>
	    </div>
	    <section class="target-lists">
	    	<transition-group tag="div" name="fade" style="flex-grow: 1;display: flex; flex-direction: column;" v-bar>
	    		<ul key="container" style="flex-grow: 1;font-size:0px">
	    			<li 
	    				class="target-list pull-left" 
	    				v-for="(item,index) in allTargetsSearch" 
	    				:class="{'target-list-Nobottom':(allTargetsSearch.length%2 !== 0 && index==allTargetsSearch.length-1)}"
	    				:key="item.indexInfo && item.indexInfo.fieldName">
	    				<label class="optional-target">
			              	<input type="checkbox" :checked="item.indexInfo && tempOptionalTargetNames.indexOf(item.indexInfo.fieldName) > -1" @click="toggleOptionalTarget(item)" />
			              	<span class="tag-name">{{item.indexInfo && item.indexInfo.tagName}}</span>
		            	</label>
		            	<p class="tag-desc">{{item.indexInfo && item.indexInfo.tagDesc}}</p>
		            </li>
	    		</ul>
	    	</transition-group>
	    </section>
	</div>
</template>
<script>
	import message from 'vue-multiple-message'
	import {mapState, mapMutations} from 'vuex'
	import {SET_ALL_TARGETS_BYTAGNAME, SET_OPTIONAL_TARGETS} from 'store/mutation-types'
	import {getIndexByTagName, addOptionalTargets} from 'api/targets'
	import axios from 'axios'
	export default{
		data() {
		    return {
		    	tagName:'',
		        tempOptionalTargets: [],
		    }
		},
		computed:{
			...mapState(['allTargetsSearch', 'optionalTargets']),
			tempOptionalTargetNames() {
		      return this.tempOptionalTargets.map(item => {
		        return item.indexInfo && item.indexInfo.fieldName
		      })
		    },
		    dateTime(){
		      let endDate = new Date()
		      let year = endDate.getFullYear()
		      let month = endDate.getMonth()
		      if( month == 0 ){
		        year = year-1
		        month = 12
		      }
		      return year+'年'+ month +'月'
		    }
		},
		methods:{
			...mapMutations([SET_ALL_TARGETS_BYTAGNAME, SET_OPTIONAL_TARGETS]),
			goback(){
				this.$router.push({
			        path: '/filter/add'
			    })
			},
			search(){
				//console.log(this.tagName)
				const context = this
				let tagName = sessionStorage.getItem("tagName")
				if(context.tagName == tagName){ return }
				sessionStorage.setItem("tagName", context.tagName)
				tagName = sessionStorage.getItem("tagName")
				//console.log(tagName)
				getIndexByTagName(tagName).then(({resultCode, resultContent}) => {
					if(resultCode == '001'){
						context[SET_ALL_TARGETS_BYTAGNAME]({
							type: SET_ALL_TARGETS_BYTAGNAME,
							data: resultContent
						})
					}else if(resultCode == '009') {
			        	this.$router.push({
			        		path:'./fail',
			        		name:'fail',
			        		params:{msg:resultContent}
			        	})
			        }else{
			        	message.error(resultContent)
					}
		    	}).catch((err)=>{
			    	message.error(err)
			   	})
				// axios({
				//    	url:'static/data.json',
				//    	type:'post',
				//    	data:tagName
			 //    }).then((res)=>{
			 //   		const resultCode = res.data.getIndexByTagName.resultCode
			 //   		const resultContent = res.data.getIndexByTagName.resultContent
			 //   		//console.log(resultContent)
			 //   		if(resultCode !== '001'){
			 //   			message.error(resultContent)
			 //   		}
			 //   			context[SET_ALL_TARGETS_BYTAGNAME]({
				// 			type: SET_ALL_TARGETS_BYTAGNAME,
				// 			data: resultContent
				// 		})
			 //    }).catch((err)=>{
			 //   		console.log(err)
			 //    })
			},
			toggleOptionalTarget(item) { // 通过指标的 fieldName 判断当前是否已关注，然后做出相应的操作
		      	item = JSON.parse(JSON.stringify(item))
				const fieldName = item.indexInfo && item.indexInfo.fieldName
				const index = this.tempOptionalTargetNames.indexOf(fieldName)
				if (index > -1) { // 如果当前指标已被关注，移除此指标
					this.tempOptionalTargets.splice(index, 1)
				} else if (index === -1) { // 如果当前指标未关注，添加此指标
					this.tempOptionalTargets.push(item)
				}
				//console.log(this.optionalTargets,this.tempOptionalTargets)
		    },
		    saveOptionalTargets(event) { // 保存当前选择的关注指标
			      const context = this
			      event.target.disabled = true
			      const data = JSON.parse(JSON.stringify(context.tempOptionalTargets))
			      const tagIds = data.map(item => { // 所有关注指标的tagId
			        return item.indexInfo.tagId
			      })
			      addOptionalTargets(tagIds).then(({resultCode, resultContent}) => {
			        event.target.disabled = false
			        if(resultCode == '001'){
			        	context[SET_OPTIONAL_TARGETS]({
				          type: SET_OPTIONAL_TARGETS,
				          data
				        })
				        message.info(resultContent)
				        this.$router.push({
				        	path: '/filter/add'
				    	})
			        }else if(resultCode == '009') {
			        	this.$router.push({
			        		path:'./fail',
			        		name:'fail',
			        		params:{msg:resultContent}
			        	})
			        }else{
			          message.resultContent(resultContent)
			          return
			        }
			      }).catch(err => {
			        event.target.disabled = false
			        message.error(err)
			      })
		    },
		    cancelOptionalTargets(){
		    	message.info('取消新增关注指标')
		    	this.$router.push({
			        path: '/filter/add'
			    })
		    }
		},
		created(){
			const context = this
			const tagName = sessionStorage.getItem("tagName")
			// 获取所有指标
		    getIndexByTagName(tagName).then(({resultCode, resultContent}) => {
					if(resultCode == '001'){
						context[SET_ALL_TARGETS_BYTAGNAME]({
							type: SET_ALL_TARGETS_BYTAGNAME,
							data: resultContent
						})
					}else if(resultCode == '009') {
			        	this.$router.push({
			        		path:'./fail',
			        		name:'fail',
			        		params:{msg:resultContent}
			        	})
			        }else{
						message.error(resultContent)
						return
		      		}
					
		    }).catch((err)=>{
			    message.error(err)
			})
		   // axios({
			  //  	url:'static/data.json',
			  //  	type:'post',
			  //  	data:tagName
		   // }).then((res)=>{
		   // 		const resultCode = res.data.getIndexByTagName.resultCode
		   // 		const resultContent = res.data.getIndexByTagName.resultContent
		   // 		if(resultCode !== '001'){
		   // 			message.error(resultContent)
		   // 		}
		   // 			context[SET_ALL_TARGETS_BYTAGNAME]({
					// 	type: SET_ALL_TARGETS_BYTAGNAME,
					// 	data: resultContent
					// })
		   // }).catch((err)=>{
		   // 		console.log(err)
		   // })
		    // 将关注指标暂存到状态中
		    context.tagName = sessionStorage.getItem("tagName")
		    context.tempOptionalTargets = JSON.parse(JSON.stringify(context.optionalTargets))
		    //context.oldOptionalTargets = JSON.parse(JSON.stringify(context.optionalTargets))
		    //console.log( context.oldOptionalTargets)
		},
		beforeRouteEnter(to, from, next) {
		    sessionStorage.setItem("tagName", to.params.tagName) 
		    to.meta.keepAlive = false
		    next()
	  	},
	  	destroyed(){
	  		sessionStorage.removeItem("tagName")
	  	}
	}
</script>
<style scoped>
	#search-target{
		position: relative;
		padding: 110px 75px 95px;
		width: 100%;
		height: 100%;
		background-color: #3c4451;
		box-sizing: border-box;
	}
	
	#search-target input[type="checkbox"]:after {
		background-image: url('../assets/imgs/checkbox_false.png');
	}
	#search-target input[type="checkbox"]:checked:after {
		background-image: url('../assets/imgs/checkbox_true.png');
	}
	#search-target input[type="checkbox"]:checked:hover:after {
		background-image: url('../assets/imgs/checkbox_false_hover.png');
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
	  position: absolute;
	  top: 65px;
	  width: calc(100% - 150px);
	}
	.nav-bar .search-input {
	  width: 300px;
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
	  top:5px;
	  left:300px;
	}
	.nav-bar .search-input:focus {
	  outline: none;
	}
	.nav-bar .statistics-date {
	  line-height: 28px;
	  margin-left: 20%;
	}
	.nav-bar  .btn{
		border: none;
	  	background: transparent;
	  	border-radius: 20px;
	  	padding:10px 25px;
	  	color: #fff;
	}
	.nav-bar .add{
		background-color: #4684e9;
	}
	.nav-bar .cancel{
		background-color: #313844;
	}
	.target-lists{
		width:1200px;
		height:100%;
		margin:20px auto;
		box-sizing: border-box;
		background-color:  #313844;
		border-radius: 10px;
		display: flex;
		justify-content: space-around;
		align-items: stretch;
	}
	.target-list{
		width: 50%;
		height: 100px;
		border-bottom: 1px solid #ddd;
		font-size: 14px;
		display: flex;
		flex-direction:column;
		justify-content: center; 
		padding-left:40px;
	}
	.target-list-Nobottom{
		border-bottom: none !important;
	}
	/*.target-list:last-child,.target-list:nth-last-child(2){
		border-bottom: none;
	}*/
	.optional-target{
		width: 100%;
		padding-bottom:10px;
		font-size: 16px;
	}
	.tag-name{
		margin-left: 10px;
	}
	.tag-desc{
		width: 400px;
		height: 24px;
		font-size: 12px;
		margin-left: 38px;
		overflow:hidden;
		cursor: default;
		text-overflow: ellipsis;
	}
</style>