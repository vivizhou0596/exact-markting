import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import targetMutations from './targetMutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    allTargets: [], // 所有指标
    allTargetsSearch:[],//搜索得到的所有指标
    recommendTargets: [], // 系统推荐指标
    optionalTargets: [], // 关注指标
    choosedTargets: [], // 选中的指标
    userGroup: 0, // 添加后用户群目标
    prevGroup: 0, // 上次筛选用户群目标
    groupName: '我的用户群', // 用户群名称
    current:1,//我的用户群分页，当前页
    allpage:1,//我的用户群分页，总页数
  },
  getters: {
    optionalTargetNames: state => { // 关注指标的 fieldName 形成的数组
      const result = state.optionalTargets.map(item => {
        return item.indexInfo.fieldName
      })
      return result
    },
    choosedTargetNames: state => { // 利用所有选中项的 fieldName 形成选中指标的字段组成的数组
      const result = state.choosedTargets.map(item => {
        return item.indexInfo.fieldName
      })
      return result
    }
  },
  mutations: {
    ...targetMutations
  }
})

export default store