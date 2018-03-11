import {
  SET_ALL_TARGETS_BYTAGNAME,
  SET_ALL_TARGETS,
  SET_RECOMMEND_TARGETS,
  SET_OPTIONAL_TARGETS,
  ADD_OPTIONAL_TARGETS,
  REMOVE_OPTIONAL_TARGETS,
  SET_CHOOSED_TARGETS,
  ADD_CHOOSED_TARGETS,
  REMOVE_CHOOSED_TARGETS,
  UPDATE_CHOOSED_TARGETS,
  SET_PAGENITION_CURR,
  SET_PAGENITION_TOTAL,
  SET_USERGROUP,
  SET_PREVGROUP,
  SET_GROUPNAME,
  SET_USER_SCALE
} from './mutation-types' // 引入指标的所有 mutation 类型

export default {
  [SET_ALL_TARGETS_BYTAGNAME](state, payload) { // 设置所有指标
    if (Array.isArray(payload.data)) {
      state.allTargetsSearch = payload.data
    }
  },
  [SET_ALL_TARGETS](state, payload) { // 设置所有指标
    if (Array.isArray(payload.data)) {
      state.allTargets = payload.data
    }
  },
  [SET_RECOMMEND_TARGETS](state, payload) { // 设置推荐指标
    if (Array.isArray(payload.data)) {
      state.recommendTargets = payload.data
    }
  },
  [SET_OPTIONAL_TARGETS](state, payload) { // 设置关注指标
    if (Array.isArray(payload.data)) {
      state.optionalTargets = payload.data
    }
  },
  [ADD_OPTIONAL_TARGETS](state, payload) { // 添加关注指标
    if (typeof payload.data === 'object') {
      state.optionalTargets.push(payload.data)
    }
  },
  [REMOVE_OPTIONAL_TARGETS](state, payload) { // 移除关注指标
    if (typeof payload.index === 'number') {
      state.optionalTargets.splice(payload.index, 1)
    }
  },
  [SET_CHOOSED_TARGETS](state, payload) { // 设置勾选指标
    if (Array.isArray(payload.data)) {
      state.choosedTargets = payload.data
    }
  },
  [SET_USERGROUP](state, payload) { // 设置目标用户群数量
    if (typeof payload.data === 'number') {
      state.userGroup = payload.data
    }
  },
  [SET_PREVGROUP](state, payload) { // 设置历史目标用户群数量
    if (typeof payload.data === 'number') {
      state.prevGroup = payload.data
    }
  },
  [SET_GROUPNAME](state, payload) { // 设置目标用户群名称
    if (typeof payload.data === 'string') {
      state.groupName = payload.data
    }
  },
  [ADD_CHOOSED_TARGETS](state, payload) { // 添加勾选指标，即勾选
    if (typeof payload.data === 'object') {
      state.choosedTargets.push(payload.data)
    }
  },
  [REMOVE_CHOOSED_TARGETS](state, payload) { // 移除勾选指标，即不勾选
    if (typeof payload.index === 'number') {
      state.choosedTargets.splice(payload.index, 1)
    }
  },

  [UPDATE_CHOOSED_TARGETS](state, payload) { // 修改勾选指标
    if (typeof payload.index === 'number') {
      // 待完成
      //console.log(payload.index)
    }
  },

  [SET_PAGENITION_CURR](state, payload) { // 设置当前页
    if (typeof payload.data === 'number') {
      state.current = payload.data
    }
  },
  [SET_PAGENITION_TOTAL](state, payload) { // 设置总页数
    if (typeof payload.data === 'number') {
      state.allpage = payload.data
    }
  }
}