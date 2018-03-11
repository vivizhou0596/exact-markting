<template>
  <div id="add-target">
    <a class="back" @click="goback" key="addBack"></a>
    <div class="clearfix nav-bar">
      <input type="text" class="pull-left search-input" placeholder="搜索指标名称" v-model="tagName"/>
      <button
        type="button"
        @click="goSearch"
        class="search-btn">
        <img src="../common/img/search.png" alt="搜索">
      </button>
      <span class="pull-right statistics-date">
        数据统计截止：<strong>{{dateTime}}</strong>
      </span>
    </div>
    <section class="target-lists">
      <div class="target-list add-targets" style="flex-grow: 1;">
        <div class="target-group-container" v-bar>
          <ul>
            <li class="target-group" v-for="item in allTargets" :key="item.indexUp && item.indexUp.fieldName">
              <h3>{{item.indexUp && item.indexUp.tagName}}</h3>
              <div>
                <label v-for="subItem in item.index" :key="subItem.indexInfo && subItem.indexInfo.fieldName" class="target-item">
                  <input type="checkbox" :checked="subItem.indexInfo && tempOptionalTargetNames.indexOf(subItem.indexInfo.fieldName) > -1" @click="toggleOptionalTarget(subItem)" />
                  <span :title="subItem.indexInfo && subItem.indexInfo.tagDesc">{{subItem.indexInfo && subItem.indexInfo.tagName}}</span>
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="target-list optional-targets">
        <h3>我的指标</h3>
        <transition-group tag="div" name="fade" style="flex-grow: 1;display: flex; flex-direction: column;" v-bar>
          <div key="container" style="flex-grow: 1;">
            <label v-for="(item, index) in tempOptionalTargets" :key="item.indexInfo && item.indexInfo.fieldName" class="optional-target">
              <input type="checkbox" checked @click="removeOptionalTarget(index)" />
              <span :title="item.indexInfo && item.indexInfo.tagDesc"> {{item.indexInfo && item.indexInfo.tagName}}</span>
            </label>
          </div>
        </transition-group>
      </div>
    </section>
    <div class="confirm-container">
      <button type="button" class="confirm-btn" @click="saveOptionalTargets">确定添加</button>
    </div>
  </div>
</template>

<script>
import message from 'vue-multiple-message'
import {mapState, mapMutations,mapGetters} from 'vuex'
import {SET_ALL_TARGETS, SET_OPTIONAL_TARGETS,REMOVE_CHOOSED_TARGETS} from 'store/mutation-types'
import {getAllTargets, addOptionalTargets,getOptionalTargets} from 'api/targets'

export default {
  data() {
    return {
      tempOptionalTargets: [],
      tagName:''
    }
  },
  computed: {
    ...mapState(['allTargets', 'optionalTargets']),
    ...mapGetters(['optionalTargetNames', 'choosedTargetNames']),
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
  methods: {
    ...mapMutations([SET_ALL_TARGETS, SET_OPTIONAL_TARGETS,REMOVE_CHOOSED_TARGETS]),
    goback() {
      this.$router.push({
        path: '/filter',
      })
    },
    goSearch(){
      //console.log(this.optionalTargets)
      this.$router.push({
        path: '/filter/search',
        name:'filterSearch',
        params:{tagName:this.tagName}
      })
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
    },
    removeOptionalTarget(index) { // 移除当前的临时关注项中的某项
      this.tempOptionalTargets.splice(index, 1)
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
            data:data
          })
          context.choosedTargetNames.forEach( (element, index)=>{//判断当前选中的指标中，是否都在关注指标中，
            const chooseIndex = context.optionalTargetNames.indexOf(element)
            //console.log(index,chooseIndex)
            if (chooseIndex === -1) { // 如果当前选中指标已不在关注指标中，从选中指标中移除此指标
              context[REMOVE_CHOOSED_TARGETS]({
                type: REMOVE_CHOOSED_TARGETS,
                index
              })
            }
            //console.log(context.choosedTargetNames)
          });
          context.$router.push({
            path: '/filter'
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
      }).catch(err => {
        event.target.disabled = false
         message.error(err)
      })
    }
  },
  beforeRouteLeave(to, from, next){
    console.log("添加页面to"+to.path)
    to.meta.keepAlive = true; // 让 页面缓存，即不刷新
    next();
  },
  created() {
    const context = this

    // 获取所有指标
    getAllTargets().then(({resultCode, resultContent}) => {
			if(resultCode == '001'){
        context[SET_ALL_TARGETS]({
          type: SET_ALL_TARGETS,
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
    //获取关注指标
    getOptionalTargets().then(({resultCode, resultContent}) => {
      if(resultCode == '001'){
        //console.log(resultContent)
        context[SET_OPTIONAL_TARGETS]({
          type: SET_OPTIONAL_TARGETS,
          data: resultContent
        })
        //console.log( context.optionalTargets )
        context.tempOptionalTargets = JSON.parse(JSON.stringify(context.optionalTargets))
       // console.log(context.optionalTargets)
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
    // 将关注指标暂存到状态中

  },
  beforeRouteEnter(to, from, next) {
    to.meta.keepAlive = false
    // if (from.path === '/filter/search') {
    //   to.meta.keepAlive = true
    // } else {
    //   to.meta.keepAlive = false
    // }
    next()
  }
}
</script>

<style scoped>
#add-target input[type="checkbox"]:after {
	background-image: url('../assets/imgs/checkbox_false.png');
}
#add-target input[type="checkbox"]:checked:after {
	background-image: url('../assets/imgs/checkbox_true.png');
}
#add-target input[type="checkbox"]:checked:hover:after {
	background-image: url('../assets/imgs/checkbox_false_hover.png');
}
#add-target {
  position: relative;
  padding: 110px 75px 95px;
  width: 100%;
  height: 100%;
  background-color: #3c4451;
  box-sizing: border-box;
}
#add-target h3 {
	margin-bottom: 10px;
	font-size: 16px;
	color: #e0e0e0;
	font-weight: bold;
}
#add-target .back {
	position: absolute;
	left: 75px;
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
  position: relative;
}
.nav-bar .search-btn{
  border: none;
  background: transparent;
  position: absolute;
  top:5px;
  left:250px;
}
.nav-bar .search-input:focus {
  outline: none;
}
/* .nav-bar .search-input:after {
  content: '';
  display: block;
  width: 28px;
  height: 28px;
  background-image: url('../assets/imgs/search.png');
  background-size: 22px 22px;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 2;
  position: absolute;
  top: 0;
  right: 0;
} */
.nav-bar .statistics-date {
  line-height: 28px;
}
.target-lists {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}
.target-lists>.target-list {
  margin-right: 20px;
  padding: 40px 30px;
  background-color: #353b47;
}
.target-lists>.target-list:last-child {
  margin-right: 0;
}
.target-lists>.target-list .target-group-container {
  height: 100%;
}
.target-lists>.target-list .target-group-container .target-group {
  margin-bottom: 24px;
}
.target-lists>.target-list .target-group-container .target-group:last-child {
  margin-bottom: 0;
}
.target-lists>.target-list .target-item{
  margin-right: 16px;
  line-height: 32px;
  display: inline-block;
}
.target-lists>.target-list .target-item:last-child {
  margin-right: 0;
}
.target-lists>.target-list.optional-targets{
  width:500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.target-lists>.target-list .optional-target{
  width: 50%;
  line-height: 32px;
  display: inline-block;
}
.confirm-container {
  position: absolute;
  bottom: 29px;
  width: calc(100% - 150px);
  text-align: center;
}
.confirm-btn {
  background-color: rgb(70, 132, 233);
  padding: 9px 30px;
  color: #fff;
  font-size: 14px;
  border: none;
  border-radius: 21px;
  cursor: pointer;
}
</style>

