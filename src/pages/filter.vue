<template>
	<div class="row relative" id="filter-container">
		<a class="back" @click="goback" key="filterBack"></a>
		<!-- <div class="section-box"> -->
			<section class="col relative" style="width: calc(34.5% - 16px);margin-right: 16px;">
				<div class="targets" style="margin-bottom: 5px;height:50%">
					<h3>用户特征筛选</h3>
					<div class="my-targets clearfix" v-bar>
						<div>
							<div class="target" v-for="(item, index) in optionalTargets" :key="item.indexInfo && item.indexInfo.fieldName">
								<label>
									<input
										type="checkbox"
										:value="item.indexInfo && item.indexInfo.fieldName"
										:checked="item.indexInfo && choosedTargetNames.indexOf(item.indexInfo.fieldName) > -1"
										 @click="toggleChoose(item)"
									/>
									<span :title="item.indexInfo &&item.indexInfo.tagDesc">{{item.indexInfo && item.indexInfo.tagName}}</span>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="targets" style="height:40%">
					<h3>系统推荐指标</h3>
					<div class="recommend-targets clearfix" v-bar>
						<div>
							<a
								:class="[
								  'target',
									'pull-left',
									item.indexInfo && choosedTargetNames.indexOf(item.indexInfo.fieldName) > -1 ? 'filter-active' : ''
								]"
								v-for="item in recommendTargets"
								:key="item.indexInfo && item.indexInfo.fieldName"
								@click.prevent="toggleChoose(item)"
							>
								<h4>{{item.indexInfo && item.indexInfo.tagName}}</h4>
								<span style="font-size:12px;">{{item.indexInfo && item.indexInfo.tagDesc}}</span>
							</a>
						</div>
					</div>
				</div>
				<router-link
				  to="/filter/add"
					tag="button"
					type="button"
					class="btn"
					style="background-color: #353b47;border: 2px solid #5D6574;position: absolute;bottom: 24px;left: 14px;"
				>添加关注指标
				</router-link>
			</section>
			<section class="col relative flex" style="width: calc(34.5% - 16px);margin-right: 16px;align-items: stretch;padding-right: 0;">
				<h3>指标值设定</h3>
				<div class="target-setting" v-bar>
					<div style="flex-grow: 1;">
						<component
						  v-for="(item, index) in choosedTargets"
							:is="getComp(item)"
							:ref="item.indexInfo && item.indexInfo.fieldName"
							:key="item.indexInfo && item.indexInfo.fieldName"
							:closeTarget="toggleChoose.bind(this, item)"
							:item="item"
							@change="changeTargetVal"
						>
						</component>
					</div>
				</div>
				<button
				  type="button"
					class="btn"
					style="background-color: #4684e9;position: absolute;bottom: 24px;left: 14px;"
					@click="calcUserGroupVolumn"
				>
				  确定设定值
				</button>
			</section>
			<section class="col flex numbox" style="width: 33%;padding: 0;background-color: #3c4451;">
				<!-- <div> -->
					<div class="counter">
						<div class="counter-content">
							<div class="group">
								<h4>添加后目标用户群</h4>
								<div class="user-group" style="font-size: 40px;color: #353c48;line-height: 52px;">
									<span class="user-split-num" v-for="(charc, index) in splitUserGroup" :key="index">{{charc}}</span>
								</div>
							</div>
							<div class="group">
								<h4>上次筛选目标用户群</h4>
								<div class="user-group" style="font-size: 24px;color: #067b80;line-height: 31px;">
									<span class="user-split-num" v-for="(charc, index) in splitPrevGroup" :key="index">{{charc}}</span>
								</div>
							</div>
							<div class="group">
								<h4>添加用户群名称</h4>
								<input type="text" placeholder="请输入用户群名称" class="group-name-input" :value="groupName" v-on:input="updategroupName"/>
							</div>
							<button type="button" class="btn" style="background-color: #2b76f1;" @click="saveUserGroup">保存</button>
						</div>
					</div>
					<div class="news">
						<h4>提示</h4>
						<p>2017年8月，全省用户约<span style="font-size:30px;font-weight:bold;">" 6000万 "</span></p>
						<p>4G用户约为<span style="font-size:20px;font-weight:bold;">3100万,</span><span style="font-size:14px;font-weight:bold;">平均ARPU约为</span><span style="font-size:30px;font-weight:bold;">62元</span></p>
						<p>2017年8月，平均流量约为<span style="font-size:30px;font-weight:bold;">" 708M "</span></p>
						<ul style="position:absolute;bottom:20px;left:50%;transform:translate3d(0 -50%)text-align:center;">
							<li style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#fdb8a4"></li>
						</ul>
					</div>
				<!-- </div> -->
			</section>
		<!-- </div> -->
		<my-dialog :is-show="isShowCala" >
			<div class="filer-calamodal"><p>正在计算用户群人数，请稍等</p><img src="../common/img/timg2.gif" ></div>
		</my-dialog>
		<my-dialog :is-show="isShowSave" >
			<div class="filer-calamodal">
				<p>正在保存(<span class="save-userName" :title="groupName">{{groupName}} </span>)用户群，约需2-4分钟</p>
				<p>请勿刷新或关闭网页<img src="../common/img/timg2.gif" style="height:15px;margin-left:10px;"></p>
			</div>
		</my-dialog>
	</div>
</template>
<script>
import message from 'vue-multiple-message' // 引入 message 组件，用于弹出提示信息
import {mapState, mapGetters, mapMutations} from 'vuex'
import {getRecommendTargets, getOptionalTargets, loadUserGroup, calcGroupVolumn, saveGroup, updateGroup} from 'api/targets'
import {
	SET_RECOMMEND_TARGETS,
	SET_OPTIONAL_TARGETS,
	SET_CHOOSED_TARGETS,
	ADD_CHOOSED_TARGETS,
	REMOVE_CHOOSED_TARGETS,
	UPDATE_CHOOSED_TARGETS,
	SET_USERGROUP,
	SET_PREVGROUP,
	SET_GROUPNAME
} from 'store/mutation-types' // 获取当前模块需要的 mutation 类型
import Range from 'components/Range'
import {targets, targetMap, recomTargets} from './mock/filter' // 引入假数据
import myDialog from '../components/base/dialog'
import axios from 'axios'
// 单选框组件
const RadioTarget = {
	name: 'radio-target',
	props: ['closeTarget', 'item'],
	data() {
		return {
			value: '',
			logic: 'and',
		}
	},
	template: `
		<transition name="fade">
			<div class="target-range clearfix">
				<label class="target-name pull-left clearfix" :title="item.indexInfo &&item.indexInfo.tagDesc">
					<input type="checkbox" class="high pull-left" checked @click="closeTarget" />
					{{item.indexInfo && item.indexInfo.tagName}}
				</label>
				<select class="pull-right target-logic" v-model="logic">
					<option value="and">and</option>
					<option value="or">or</option>
				</select>
				<label class="target-option pull-left" v-for="subItem in item.indexVice">
					<input type="radio" :name="item.indexInfo && item.indexInfo.fieldName" :value="subItem.tagValue" v-model="value" /> {{subItem.tagDesc}}
				</label>
			</div>
		</transition>
	`,
	created() {
		console.log(this.item)
		this.value = (this.item && this.item.initValue) || (this.item && this.item.indexVice && this.item.indexVice[0].tagValue)
		this.logic = (this.item && this.item.initLogic) || 'and'
	},
	watch:{
		value(){ this.$emit('change',true) },
		logic(){ this.$emit('change',true) },
	}
}

// 多选框组件
const CheckboxTarget = {
	name: 'checkbox-target',
	props: ['closeTarget', 'item'],
	data() {
		return {
			value: [],
			logic: 'and'
		}
	},
	template: `
		<transition name="fade">
			<div class="target-range clearfix">
				<label class="target-name pull-left clearfix" :title="item.indexInfo && item.indexInfo.tagDesc">
					<input type="checkbox" class="high pull-left" checked @click="closeTarget" />
					{{item.indexInfo && item.indexInfo.tagName}}
				</label>
				<select class="pull-right target-logic" v-model="logic">
					<option value="and">and</option>
					<option value="or">or</option>
				</select>
				<div class=" pull-left " style="width:260px">
					<label class="target-option" v-for="subItem in item.indexVice">
						<input type="checkbox" :name="item.indexInfo && item.indexInfo.fieldName" :value="subItem.tagValue" v-model="value" /> {{subItem.tagDesc}}
					</label>
				</div>
			</div>
		</transition>
	`,
	created() {
		this.value = (this.item && this.item.initValue) || (this.item && this.item.indexVice && [this.item.indexVice[0].tagValue])
		this.logic = (this.item && this.item.initLogic) || 'and'
	},
	watch:{
		value(){ this.$emit('change',true) },
		logic(){ this.$emit('change',true) },
	}
}

// 范围组件
const RangeTarget = {
	name: 'range-target',
	props: ['closeTarget', 'item'],
	data() {
		return {
			initFrom: 0,
			initTo: 100,
			logic: 'and'
		}
	},
	template: `
		<transition name="fade">
			<div class="target-range clearfix">
				<label class="target-name pull-left clearfix" :title="item.indexInfo && item.indexInfo.tagDesc">
					<input type="checkbox" class="high pull-left" checked @click.stop="closeTarget" />
					{{item.indexInfo && item.indexInfo.tagName}}
				</label>
				<select class="pull-right target-logic" v-model="logic">
					<option value="and">and</option>
					<option value="or">or</option>
				</select>
				<div class="target-range-line">
					<Range
						:name="item.indexInfo && item.indexInfo.fieldName"
						ref="range"
						:color="'#01c293'"
						:min="item.indexInfo && parseInt(item.indexInfo.tagDown)"
						:max="item.indexInfo && parseInt(item.indexInfo.tagUp)"
						:initFrom="initFrom && parseInt(initFrom)"
						:initTo="initTo && parseInt(initTo)"
					/>
				</div>
			</div>
		</transition>
	`,
	components: {
		Range
	},
	created() {
		this.initFrom = (this.item && this.item.initFrom) || (this.item.indexInfo && parseInt(this.item.indexInfo.tagDown))
		this.initTo = (this.item && this.item.initTo) || (this.item.indexInfo && parseInt(this.item.indexInfo.tagUp))
		this.logic = (this.item && this.item.initLogic) || 'and'
	},
	watch:{
		initFrom(){ this.$emit('change',true) },
		initTo(){ this.$emit('change',true) },
		logic(){ this.$emit('change',true) }
	}
}

export default {
	name: 'filter',
	data() {
		return {
			currentStep: 'add', // 当前处理流程的状态是新增还是编辑，新增'add'，编辑'edit'
			tempCalcData: [], // 存储用于计算用户群大小的临时字段，每次计算刷新值
			isShowCala:false,
			isShowSave:false,
			isCalcUserGroup:false,
			fromPath:''
		}
	},
	computed: {
		//...mapState({ groupName:state => state.groupName }),//state的另一种取值方式
		...mapState(['recommendTargets', 'optionalTargets', 'choosedTargets','userGroup','prevGroup','groupName']),
		...mapGetters(['optionalTargetNames', 'choosedTargetNames']),
		splitUserGroup() { // 添加后目标用户群split值
			return this.userGroup.toString().split('')
		},
		splitPrevGroup() { // 上次筛选目标用户群split值
			return this.prevGroup.toString().split('')
		}
	},
	methods: {
		...mapMutations([
			SET_RECOMMEND_TARGETS,
			SET_OPTIONAL_TARGETS,
			SET_CHOOSED_TARGETS,
			ADD_CHOOSED_TARGETS,
			REMOVE_CHOOSED_TARGETS,
			UPDATE_CHOOSED_TARGETS,
			SET_USERGROUP,
			SET_PREVGROUP,
			SET_GROUPNAME
		]),
		updategroupName(e){//groupName表单数据双向数据,绑定input元素上使用:value = 'groupName',在添加事件触发回调函数回传
			const context = this
			context[SET_GROUPNAME]({//将变化的值通过mutation写入state
					type: SET_GROUPNAME,
					data: e.target.value
				})
		},
		goback() {
			if(this.fromPath == '/mine'){
				this.$router.push({
					path: '/mine'
				})
			}else if(this.fromPath == '/mine/search'){
				this.$router.push({
					path: '/mine/search'
				})
			}else{
				this.$router.push({
					path: '/index'
				})
			}
		},
		changeTargetVal(val){//判断单选，多选，范围组件值变化与否
			if(val){
				this.isCalcUserGroup = false
			}
		},
		toggleChoose(item) { // 切换指标的勾选状态
			this.isCalcUserGroup = false
			item = JSON.parse(JSON.stringify(item))
			// 通过指标的 fieldName 判断当前是否选中，然后做出相应的操作
			const fieldName = item.indexInfo && item.indexInfo.fieldName
			const index = this.choosedTargetNames.indexOf(fieldName)
			if (index > -1) { // 如果当前指标已被勾选，移除此指标
				this[REMOVE_CHOOSED_TARGETS]({
					type: REMOVE_CHOOSED_TARGETS,
					index
				})
			} else if (index === -1) { // 如果当前指标未勾选，添加此指标
				this[ADD_CHOOSED_TARGETS]({
					type: ADD_CHOOSED_TARGETS,
					data: item
				})
				console.log(this.choosedTargetNames)
			}
		},
		calcUserGroupVolumn(event) { // 计算当前的配置得到的用户群大小
			const context = this
			context.isCalcUserGroup = true
			if (!context.choosedTargets.length) {
				message.error('请至少确定一个指标的范围')
				return
			}
			event.target.disabled = true // 设置暂时不能点击
			let flag = ''
			// 生成请求数据
			const data = context.choosedTargets.map(item => {
				const indexInfo = item.indexInfo
				let ref = indexInfo.fieldName // fieldName 同时是索引值
				let configObj = {
					fieldName: ref,
					tabName: indexInfo.tabName,
					tagType: indexInfo.tagType,
					tagDown: '',
					tagUp: '',
					tagValue: '',
					andor: ''
				}
				if (indexInfo.tagType === '1') {//单选框
					configObj.tagValue = [context.$refs[ref][0].value]
					configObj.andor = context.$refs[ref][0].logic
					// 为 item 添加字段，用于最后的保存操作
					item.initValue = context.$refs[ref][0].value
					item.initLogic = context.$refs[ref][0].logic
				} else if (indexInfo.tagType === '2') {//复选框
					if (!context.$refs[ref][0].value.length) {
						message.error(item.indexInfo.tagName + '需要至少选中一项')
						event.target.disabled = false // 恢复点击
						flag = item.indexInfo.tagName
						return
					}
					configObj.tagValue = context.$refs[ref][0].value
					configObj.andor = context.$refs[ref][0].logic
					// 为 item 添加字段，用于最后的保存操作
					item.initValue = context.$refs[ref][0].value
					item.initLogic = context.$refs[ref][0].logic
				} else if (indexInfo.tagType === '3') {//范围选择
					configObj.tagValue = []
					configObj.tagDown = context.$refs[ref][0].$refs.range.intFrom
					configObj.tagUp = context.$refs[ref][0].$refs.range.intTo
					configObj.andor = context.$refs[ref][0].logic
					// 为 item 添加字段，用于最后的保存操作
					item.initFrom = context.$refs[ref][0].$refs.range.intFrom
					item.initTo = context.$refs[ref][0].$refs.range.intTo
					item.initLogic = context.$refs[ref][0].logic
				}
				if( flag.length == 0 ){
					return configObj
				}else{
					message.error(flag+'需要至少选中一项')
					return
				}
			})
			data[data.length - 1].andor = ''
			this.isShowCala = true//加载进度模态框
			// 发送请求
			calcGroupVolumn(data).then(({resultCode, resultContent}) => {
				event.target.disabled = false // 恢复点击
				if(resultCode == '001'){
					this.isShowCala = false
					message.success(`当前配置得到的用户群人数为${resultContent}`)
					//context.prevGroup = context.userGroup
					context[SET_PREVGROUP]({
						type: SET_PREVGROUP,
						data: context.userGroup
					})
					//context.userGroup = resultContent
					context[SET_USERGROUP]({
						type: SET_USERGROUP,
						data: resultContent
					})
					context.tempCalcData = data // 将本次的计算配置保存到临时状态中
				}else if(resultCode == '009') {
		        	this.$router.push({
		        		path:'./fail',
		        		name:'fail',
		        		params:{msg:resultContent}
		        	})
		        }else{
					message.error(resultContent)
					this.isShowCala = false
					return
				}
			}).catch(err => {
				this.isShowCala = false//移除模态框
				event.target.disabled = false // 恢复点击
			})
		},
		saveUserGroup() {
			const context = this, currentStep = context.currentStep
			if(!context.isCalcUserGroup){
				message.error('请确定设定值')
				return
			}
			if (!context.groupName) {
				message.error('请输入用户群名称')
				return
			}
			if (!context.choosedTargets.length) {
				message.error('至少需要指定一项指标的范围')
				return
			}
			let data = {
				users: context.userGroup, // 用户群人数
				batchName: context.groupName, // 用户群名称
				params: context.tempCalcData, // 计算此用户群的计算信息
				fileInfo: JSON.stringify({ // 用户群配置信息
					choosedTargets: context.choosedTargets,
					userGroup: context.userGroup,
					groupName: context.groupName,
					tempCalcData: context.tempCalcData
				})
			}
			this.isShowSave = true //保存等待的模态框显示
			window.onbeforeunload = function(){//捕获浏览器刷新，关闭事件
		        //console.log('执行了 onbeforeunload')
		        axios({
			        url:'build/reloadData',
			        method:'get',
			        async:false
		    	}).then((res)=>{
		    		console.log(res)
		    	}).catch((err)=>{
				  console.log(err)
				})
	        }
	        window.addEventListener('hashchange', function() {//捕获浏览器后退事件，hash值改变地址栏#/之后的内容
	            //为当前导航页附加一个tag
	            this.history.replaceState('hasHash', '', '');
	            //console.log('监听到返回')
	            window.location.reload()
	        }, false);
			if (currentStep === 'add') { // 如果是新增用户群
				saveGroup(data).then(({resultCode, resultContent}) => {
					if(resultCode == '001'){
						this.isShowSave = false
						message.success({
							message: resultContent,
							onClose: context.$router.push('/mine')
						})
					}else if(resultCode == '009') {
			        	this.$router.push({
			        		path:'./fail',
			        		name:'fail',
			        		params:{msg:resultContent}
			        	})
			        }else {
						this.isShowSave = false
						message.error(resultContent)
						return
					}
				}).catch((err)=>{
			    	message.error(err)
				})
			} else if (currentStep === 'edit') {
				data.batchId = context.$route.params.batchId
				updateGroup(data).then(({resultCode, resultContent}) => {
					if(resultCode == '001'){
						this.isShowSave = false
						message.success({
							message: resultContent,
							onClose: context.$router.push('/mine')
						})
					}else if(resultCode == '009') {
			        	this.$router.push({
			        		path:'./fail',
			        		name:'fail',
			        		params:{msg:resultContent}
			        	})
			        }else{
						message.error(resultContent)
						this.isShowSave = false
						return
					}
				}).catch((err)=>{
			    	message.error(err)
				})
			}
		},
		getComp(item) { // 得到欲渲染的子组件类型
			const type = item.indexInfo && item.indexInfo.tagType
			switch (type) {
				case '1':
					return 'radio-target'
					break;
				case '2':
					return 'checkbox-target'
					break;
				case '3':
					return 'range-target'
					break;
				default:
					return 'radio-target'
				  break;
			}
		}
	},
	components: {
		RadioTarget,
		CheckboxTarget,
		RangeTarget,
		myDialog
	},
	created() {
		const context = this
		const params = context.$route.params
		const batchId = params && params.batchId
		// 获取推荐指标
		getRecommendTargets().then(({resultCode, resultContent}) => {
			if(resultCode == '001'){
				context[SET_RECOMMEND_TARGETS]({
					type: SET_RECOMMEND_TARGETS,
					data: resultContent
				})
			}else if(resultCode == '009') {
	        	this.$router.push({
	        		path:'./fail',
	        		name:'fail',
	        		params:{msg:resultContent}
	        	})
	        }else {
				message.error(resultContent)
				return
			}

		}).catch((err)=>{
	    	message.error(err)
		})
		// 获取关注指标
		getOptionalTargets().then(({resultCode, resultContent}) => {
			if(resultCode == '001'){
				context[SET_OPTIONAL_TARGETS]({
					type: SET_OPTIONAL_TARGETS,
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
		// 视是否传入了用户群参数，判断当前是新建用户群还是编辑用户群
		console.log(batchId)
		if (batchId) {
			context.currentStep = 'edit'
			loadUserGroup({batchId}).then(({resultCode, resultContent}) => {
				if(resultCode == '001'){
					const {choosedTargets, userGroup, groupName, tempCalcData} = resultContent
					context[SET_CHOOSED_TARGETS]({ type: SET_CHOOSED_TARGETS, data: choosedTargets || [] })//初始化选中指标
					context[SET_USERGROUP]({ type: SET_USERGROUP, data: userGroup || 0 })//初始化目标用户群
					context[SET_PREVGROUP]({ type: SET_PREVGROUP, data:  userGroup || 0 })//初始化历史用户群
					context[SET_GROUPNAME]({ type: SET_GROUPNAME, data: groupName || '' })//初始化历史用户群名称
					context.tempCalcData = tempCalcData || []
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
			//console.log(context.userGroup,context.prevGroup,context.groupName)
		} else {//添加的用户群所有操作选项都是初始化为0
			context.currentStep = 'add'
			context[SET_CHOOSED_TARGETS]({ type: SET_CHOOSED_TARGETS, data: [] })
			//context[SET_CHOOSED_TARGETS]({ type: SET_CHOOSED_TARGETS, data: context.choosedTargets || [] })
			context[SET_USERGROUP]({ type: SET_USERGROUP, data:  0 })
			context[SET_PREVGROUP]({ type: SET_PREVGROUP, data: 0 })
			context[SET_GROUPNAME]({ type: SET_GROUPNAME, data: '' })
		}
	},
//	beforeRouteEnter(to, from, next) {
//		if (from.path === '/filter/add') { // 如果是从所有指标页面来，则缓存
//			to.meta.keepAlive = true
//		} else { // 如果由其它页面进来，则刷新
////			to.meta.keepAlive = false
//		}
//		next(vm=>{
//			vm.fromPath = from.path
//			//console.log( vm.fromPath )
//		})
//	}
}
</script>
<style>
/*
 * 注意这里不要使用 scoped 样式，因为动态追加的 Range 组件里不会自动添加data-v标识，所以会导致样式失效
 * 通用样式 开始
 */
 .save-userName{
 	width:140px;
 	overflow: hidden;
 	display: inline-block;
 	white-space: nowrap;
 	line-height: initial;
    vertical-align: sub;
    text-overflow: ellipsis;
    cursor: default;
 }
.filer-calamodal{
	width:500px;
	/*height: 50px;*/
	margin:0px auto;
	background-color: #fff;
	border-radius: 5px;
	padding:10px 20px;
	text-align: center;
}
.filer-calamodal img{
	height:20px;
}
.filer-calamodal p{
	color: #333;
	font-size:20px;
	height: 40px;
	line-height: 40px;
}
#filter-container h3 {
	margin-bottom: 10px;
	font-size: 16px;
	color: #e0e0e0;
	font-weight: bold;
}
#filter-container h4 {
	margin-bottom: 8px;
	font-size: 14px;
	color: #fff;
}
#filter-container .back {
	position: absolute;
	left: 25px;
	top: 11px;
	width: 40px;
	height: 40px;
	background-image: url('../assets/imgs/back.png');
	background-size: 40px 40px;
	background-position: center;
	background-repeat: no-repeat;
	display: inline-block;
	cursor: pointer;
}
/* 单选和多选样式的控制 开始 */
#filter-container input[type="radio"], input[type="checkbox"] {
	position: relative;
}
#filter-container input[type="radio"]:after, input[type="checkbox"]:after {
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	background-size: 100%;
    background-position: center;
	background-repeat: no-repeat;
	position: absolute;
	top: 0;
	left: 0;
}
#filter-container input[type="radio"]:after {
	background-color: #353b47;
	background-image: url('../assets/imgs/radio_false.png');
}
#filter-container input[type="radio"]:checked:after {
	background-image: url('../assets/imgs/radio_true.png');
}
#filter-container input[type="checkbox"]:after {
	background-image: url('../assets/imgs/checkbox_dark.png');
}
#filter-container input[type="checkbox"]:checked:after {
	background-image: url('../assets/imgs/checkbox_true.png');
}
#filter-container input.high[type="checkbox"]:after {
	background-image: url('../assets/imgs/checkbox_false.png');
}
#filter-container input.high[type="checkbox"]:checked:after {
	background-image: url('../assets/imgs/checkbox_true.png');
}
#filter-container input.high[type="checkbox"]:checked:hover:after {
	background-image: url('../assets/imgs/checkbox_false_hover.png');
}
/* 单选和多选样式的控制 结束 */
#filter-container .btn {
	padding: 9px 22px;
	color: #fff;
	font-size: 14px;
	border: none;
	border-radius: 21px;
	cursor: pointer;
}
#filter-container .btn:focus {
	outline: none;
}
/* 通用样式 结束 */

#filter-container.row {
	width: 100%;
	height: 100%;
	padding: 15px 75px 15px;
	color: #e0e0e0;
	background-color: #3c4451;
	box-sizing: border-box;
	display: flex;
	justify-content:center;
	font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
}
#filter-container .col {
	height: 100%;
	padding: 24px 14px;
	background-color: #353b47;
	box-sizing: border-box;
	overflow: auto;
	float: left;
}
#filter-container .col.relative {
	position: relative;
	padding-bottom: 78px;
}
#filter-container .col.flex {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
}
#filter-container .col.flex.numbox{
	width:400px !important;
}
#filter-container .my-targets {
	height: calc(100% - 26px);
	margin-bottom: 10px;
}
#filter-container .my-targets .target {
	width: 50%;
	margin-bottom: 15px;
	font-size: 14px;
	float: left;
	/* line-height: 40px; */
}
#filter-container .recommend-targets {
	margin: 0 -4px;
	height: calc(100% - 26px);
}
#filter-container .recommend-targets .target {
	padding: 14px;
	margin: 6px 4px;
	display: inline-block;
	background-color: #434955;
	cursor: pointer;
}
#filter-container .recommend-targets .target.filter-active {
	background-color: #4684e9;
	background-image: url('../assets/imgs/checkbox_true.png');
	background-repeat: no-repeat;
}
#filter-container .target-setting {
	flex-grow: 1;
	overflow: auto;
	display: flex;
	flex-direction: column;
}
#filter-container .target-range {
	margin-bottom: 2em;
	margin-top:1em;
}
#filter-container .target-range:last-child {
	margin-bottom: 0;
}
#filter-container .target-range .target-name {
	width: 100px;
	line-height: 16px;
	display: inline-block;
}
#filter-container .target-range .target-name input[type="checkbox"].pull-left {
	top: -2px;
}
#filter-container .target-range .target-option {
	margin-right:1px;
	margin-bottom: 1px;
	/*white-space: nowrap;*/
}
#filter-container .target-range .target-option:last-child {
	margin-right: 0;
}
#filter-container .target-range>.target-range-line {
	width: 210px;
	margin-top: -1.1em;
	float: left;
}
#filter-container .target-range>.target-logic {
	margin: 0 12px;
	background-color: transparent;
	border: none;
	color: #e0e0e0;
	position: relative;
	top: -2px;
}
#filter-container .target-range>.target-logic:focus {
	outline: none;
}
#filter-container .target-range>.target-logic>option {
	background-color: #fff;
	color: #000;
}
#filter-container .counter, .news {
	width: 100%;
	padding: 24px 0;
	box-sizing: border-box;
	color:#fff;
	position: relative;
}
#filter-container .counter {
	height: 56%;
	/*padding: 24px 0 20px;*/
	background-color: #01c0c8;
}
#filter-container .counter .counter-content {
	width:340px;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
#filter-container .counter .user-group {
	font-weight: bold;
}
#filter-container .counter .user-group>.user-split-num {
	margin: 0 2px;
	padding: 0 5px;
	background-color: #fff;
}
#filter-container .counter .group-name-input {
	width:300px;
	padding: 10px 18px;
	border: none;
	border-radius: 18px;
	color: #666;
	font-size: 14px;
	background-color: #fff;
	box-sizing: border-box;
}
#filter-container .counter .group-name-input:focus {
	outline: none;
}
#filter-container .news {
	height: 42%;
	padding: 24px 20px;
  background-color: #fb9678;
}
#filter-container .news h4 {
	font-size: 18px;
	font-weight: bold;
	margin-bottom:20px;
}
#filter-container .news p {
	line-height: 24px;
	margin-bottom: 10px;
}
</style>
