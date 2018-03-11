import axios from 'axios'
const fake = 'dev'//dev开发模式，prod生产模式

// 发送请求获取全部 targets，赶回一个promise
function getAllTargets() {
  return axios.get(publicPath + '/build/getAllIndex').then(response => {
    return response.data
  })
}

// 发送请求获得系统推荐关注指标
function getRecommendTargets() {
  return axios.get(publicPath + '/build/getRecommendIndex').then(response => {
    return response.data
  })
}

// 发送请求获得已关注指标
// 地址后添加Math.random()是为了防止ie浏览器的自动缓存
function getOptionalTargets() {
  return axios.get(publicPath + '/build/getOptionalIndex?timeStamp='+Math.random() ).then(response => {
    return response.data
  })
}

// 添加关注指标
function addOptionalTargets(tagIds) {
  return axios.post(publicPath + '/build/addIndex', JSON.stringify(tagIds), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.data
  })
}

// 发送请求获得当前用户群指标勾线情况
function loadUserGroup({batchId}) {
  return axios.post(publicPath + '/build/loadUserGroup', JSON.stringify({
    batchId
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.data
  })
}

// 计算当前指标配置下的用户群大小
function calcGroupVolumn(data) {
  return axios.post(publicPath + '/build/setSetpoint', JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.data
  })
}

// 保存当前配置的用户群
function saveGroup({users, batchName, params, fileInfo}) {
  return axios.post(publicPath + '/build/saveUserGroup', JSON.stringify([{
      users, // 本次人数
      batchName, // 用户群名称
      params, // 计算用户群时的对象
      fileInfo // 所有配置信息保存对象
    }]), {
    headers: {
      'Content-Type': 'application/json'
    },
    //timeout:5*60*1000
  }).then(response => {
    return response.data
  })
}

// 修改用户群
function updateGroup({users, batchId, batchName, params, fileInfo}) {
  return axios.post(publicPath + '/build/updateUserGroup', JSON.stringify([{
      users, // 本次人数
      batchId, // 用户群ID
      batchName, // 用户群名称
      params, // 计算用户群时的对象
      fileInfo // 所有配置信息保存对象
    }]), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.data
  })
}
// 根据名称查找指标
function getIndexByTagName(tagName){
  return axios.post(publicPath + '/build/getIndexByTagName', JSON.stringify({
    tagName
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.data
  })
}
// 根据名称查找指标
function getCompareData(batchId,compareId){//洞察结果页，获取对比结果
  if(fake==='dev'){
    return axios.get('static/getCompareData.json').then(response => {
      return response.data
    })
  }else{
    return axios.post(publicPath +'/build/getCompareData', JSON.stringify({
      batchId,compareId
    }),{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.data
    })
  }
}
//洞察结果对比页面，获取对比用户群
function getCompareUser(batchId){
  if(fake==='dev'){
    return axios.get('static/getCompareUser.json').then(response => {
      return response.data
    })
  }else{
    return axios.post(publicPath +'/build/getCompareUser?batchId='+batchId).then(response => {
      return response.data
    })
  }
}
//获取我的用户群
function getUserGroup(currentPage,everyPage,batchName){
   if(fake==='dev'){
    return axios.get('static/getUserGroup.json').then(response => {
      return response.data
    })
  }else{
    return axios.post(publicPath +'/build/getUserGroup?currentPage='+currentPage+'&everyPage='+everyPage+'&batchName='+encodeURI(batchName)).then(response => {
      return response.data
    })
  }
}
//计算测算结果
function calcScreen(submitData){
  if(fake==='dev'){
    return axios.get('static/screen.json').then(response => {
      return response.data
    })
  }else{
    return axios.post(publicPath +'/measure/screen',{
      submitData
    }).then(response => {
      return response.data
    })
  }
}
//获取测算结果
function getClacResult (batchNo,action) {
  if(fake==='dev'){
    return axios.get('static/getClacResult.json').then(response => {
      return response.data
    })
  }else{
    return axios.post(publicPath +'/measure/calculation?batchNo='+batchNo+'&action='+action).then(response => {
      return response.data
    })
  }
}
//测算结果页修改参数获取结果
function updateCalcResult (updateResData){
  if(fake==='dev'){
    return axios.get('static/updateCalcResult.json').then(response => {
      return response.data
    })
  }else{
    return axios.post(
      publicPath +'/measure/updateCalculation',{
        updateResData:updateResData
      }
    ).then(response => {
      return response.data
    })
  }
}
//保存测算结果
function saveCalcResult(batchNo,calcName){
  if(fake==='dev'){
    return axios.get('static/saveCalcResult.json').then(response => {
      return response.data
    })
  }else{
    return axios.post(publicPath +'/measure/saveResult?measure_id='+batchNo+'&measure_name='+encodeURI(calcName)).then(response => {
      return response.data
    })
  }
}

export {
  fake,
  getAllTargets,
  getIndexByTagName,
  getRecommendTargets,
  getOptionalTargets,
  addOptionalTargets,
  loadUserGroup,
  calcGroupVolumn,
  saveGroup,
  updateGroup,
  getCompareData,
  getCompareUser,
  getUserGroup,
  calcScreen,
  getClacResult,
  updateCalcResult,
  saveCalcResult
}