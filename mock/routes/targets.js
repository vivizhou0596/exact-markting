var express = require('express')
var router = express.Router()

// 获取全部指标
router.get('/getAllIndex', function (req, res, next) {
  res
    .status(200)
    .send({
      resultCode: '001',
      resultContent: [
        {
          "index": [
            {
              "indexInfo": {
                "endTime": "2011-10-10",
                "fieldName": "mou",
                "startTime": "2011-10-10",
                "tabName": "DWV_M_USR_MB_USER_INFO",
                "tagDesc": "MOU",
                "tagDown": "0",
                "tagId": "30100",
                "tagLeve": "2",
                "tagName": "MOU",
                "tagType": "3",
                "tagUp": "1000",
                "upTagId": "30000"
              }
            }, {
              "indexInfo": {
                "endTime": "2011-10-10",
                "fieldName": "dou",
                "startTime": "2011-10-10",
                "tabName": "DWV_M_USR_MB_USER_INFO",
                "tagDesc": "DOU",
                "tagDown": "0",
                "tagId": "30200",
                "tagLeve": "2",
                "tagName": "DOU",
                "tagType": "3",
                "tagUp": "10240",
                "upTagId": "30000"
              }
            }, {
              "indexInfo": {
                "endTime": "2011-10-10",
                "fieldName": "app_type_1",
                "startTime": "2011-10-10",
                "tabName": "DWV_M_USR_MB_USER_INFO",
                "tagDesc": "是否使用即时通讯类APP",
                "tagDown": "",
                "tagId": "40100",
                "tagLeve": "2",
                "tagName": "即时通讯",
                "tagType": "1",
                "tagUp": "",
                "upTagId": "40000"
              },
              "indexVice": [
                {
                  "endTime": "2011-10-10",
                  "startTime": "2011-10-10",
                  "tagAssId": "40101",
                  "tagDesc": "是",
                  "tagId": "40100",
                  "tagValue": "1"
                }, {
                  "endTime": "2011-10-10",
                  "startTime": "2011-10-10",
                  "tagAssId": "40102",
                  "tagDesc": "否",
                  "tagId": "40100",
                  "tagValue": "0"
                }
              ]
            }
          ],
          "indexUp": {
            "endTime": "2011-10-10",
            "fieldName": "ccc",
            "startTime": "2011-10-10",
            "tabName": "表名称",
            "tagDesc": "通信特征",
            "tagDown": "",
            "tagId": "30000",
            "tagLeve": "1",
            "tagName": "通信特征",
            "tagType": "",
            "tagUp": "",
            "upTagId": "0"
          }
        }
      ]
    })
})

// 获取系统推荐指标
router.get('/getRecommendIndex', function (req, res, next) {
  res
    .status(200)
    .send({
      resultCode: '001',
      resultContent: [
        {
          "indexInfo": {
            "endTime": "2011-10-10",
            "fieldName": "fourGBill",
            "startTime": "2011-10-10",
            "tabName": "DWV_M_USR_MB_USER_INFO",
            "tagDesc": "精准率为95%",
            "tagDown": "0",
            "tagId": "30100",
            "tagLeve": "2",
            "tagName": "4G资费用户",
            "tagType": "3",
            "tagUp": "1000",
            "upTagId": "30000"
          }
        },
        {
          "indexInfo": {
            "endTime": "2011-10-10",
            "fieldName": "fourG",
            "startTime": "2011-10-10",
            "tabName": "DWV_M_USR_MB_USER_INFO",
            "tagDesc": "精准率为95%",
            "tagDown": 0,
            "tagId": "30100",
            "tagLeve": "2",
            "tagName": "4G用户",
            "tagType": "3",
            "tagUp": 1000,
            "upTagId": "30000"
          }
        },
        {
          "indexInfo": {
            "endTime": "2011-10-10",
            "fieldName": "video",
            "startTime": "2011-10-10",
            "tabName": "DWV_M_USR_MB_USER_INFO",
            "tagDesc": "精准率为95%",
            "tagDown": 0,
            "tagId": "30100",
            "tagLeve": "2",
            "tagName": "视频用户",
            "tagType": "3",
            "tagUp": 1000,
            "upTagId": "30000"
          }
        },
        {
          "indexInfo": {
            "endTime": "2011-10-10",
            "fieldName": "audio",
            "startTime": "2011-10-10",
            "tabName": "DWV_M_USR_MB_USER_INFO",
            "tagDesc": "精准率为95%",
            "tagDown": 0,
            "tagId": "30100",
            "tagLeve": "2",
            "tagName": "影音用户",
            "tagType": "3",
            "tagUp": 1000,
            "upTagId": "30000"
          }
        }
      ]
    })
})

// 获取关注指标
router.get('/getOptionalIndex', function (req, res, next) {
  res
    .status(200)
    .send({
      resultCode: '001',
      resultContent: [
        {
          "indexInfo": {
            "endTime": "2011-10-10",
            "fieldName": "campus",
            "startTime": "2011-10-10",
            "tabName": "tb_user",
            "tagDown": "100",
            "tagId": "001",
            "tagName": "校园用户",
            "tagType": "1",
            "tagUp": "200"
          },
          "indexVice": [
            {
              "endTime": "2011-10-10",
              "startTime": "2011-10-10",
              "tagAssId": "002",
              "tagDesc": "4G用户",
              "tagId": "0001",
              "tagValue": "1"
            }, {
              "endTime": "2011-10-10",
              "startTime": "2011-10-10",
              "tagAssId": "002",
              "tagDesc": "非4G用户",
              "tagId": "0002",
              "tagValue": "0"
            }
          ]
        },
        {
          "indexInfo": {
            "endTime": "2011-10-10",
            "fieldName": "userStat",
            "startTime": "2011-10-10",
            "tabName": "tb_user",
            "tagDown": "100",
            "tagId": "001",
            "tagName": "用户状态",
            "tagType": "2",
            "tagUp": "200"
          },
          "indexVice": [
            {
              "endTime": "2011-10-10",
              "startTime": "2011-10-10",
              "tagAssId": "003",
              "tagDesc": "停机",
              "tagId": "0003",
              "tagValue": "1"
            }, {
              "endTime": "2011-10-10",
              "startTime": "2011-10-10",
              "tagAssId": "003",
              "tagDesc": "正常",
              "tagId": "0004",
              "tagValue": "0"
            }
          ]
        },
        {
          "indexInfo": {
            "endTime": "2011-10-10",
            "fieldName": "arpu",
            "startTime": "2011-10-10",
            "tabName": "DWV_M_USR_MB_USER_INFO",
            "tagDesc": "MOU",
            "tagDown": "0",
            "tagId": "30100",
            "tagLeve": "2",
            "tagName": "ARPU",
            "tagType": "3",
            "tagUp": "1000",
            "upTagId": "30000"
          }
        },
        {
          "indexInfo": {
            "endTime": "2011-10-10",
            "fieldName": "fourG",
            "startTime": "2011-10-10",
            "tabName": "DWV_M_USR_MB_USER_INFO",
            "tagDesc": "MOU",
            "tagDown": "0",
            "tagId": "30100",
            "tagLeve": "2",
            "tagName": "4G用户",
            "tagType": "3",
            "tagUp": "1000",
            "upTagId": "30000"
          }
        },
        {
          "indexInfo": {
            "endTime": "2011-10-10",
            "fieldName": "bandwidth",
            "startTime": "2011-10-10",
            "tabName": "DWV_M_USR_MB_USER_INFO",
            "tagDesc": "MOU",
            "tagDown": "0",
            "tagId": "30100",
            "tagLeve": "2",
            "tagName": "潜在宽带用户",
            "tagType": "3",
            "tagUp": "1000",
            "upTagId": "30000"
          }
        },
        {
          "indexInfo": {
            "endTime": "2011-10-10",
            "fieldName": "dou",
            "startTime": "2011-10-10",
            "tabName": "DWV_M_USR_MB_USER_INFO",
            "tagDesc": "MOU",
            "tagDown": "0",
            "tagId": "30100",
            "tagLeve": "2",
            "tagName": "DOU",
            "tagType": "3",
            "tagUp": "100000",
            "upTagId": "30000"
          }
        }
      ]
    })
})

// 根据名称查找指标
router.get('/getIndexByTagName', function(req, res, next) {
  res
    .status(200)
    .send({
      resultCode: '001',
      resultContent: [
        {
          "indexInfo": {
            "endTime": "2011-10-10",
            "fieldName": "dou",
            "startTime": "2011-10-10",
            "tabName": "tb_user",
            "tagDown": "100",
            "tagId": "001",
            "tagName": "dou",
            "tagType": "3",
            "tagUp": "200"
          }
        }
      ]
    })
})

// 添加关注指标
router.post('/addIndex', function(req, res, next) {
  // 发送 tagId 组成的数组
  res
    .status(200)
    .send({
      resultCode: '001',
      resultContent: '添加关注指标成功'
    })
})

// 获取勾选指标
router.post('/loadUserGroup', function(req, res, next) {
  res
    .status(200)
    .send({
      resultCode: '001',
      resultContent: {
        choosedTargets: [
          {
            "indexInfo": {
              "endTime": "2011-10-10",
              "fieldName": "campus",
              "startTime": "2011-10-10",
              "tabName": "tb_user",
              "tagDown": "100",
              "tagId": "001",
              "tagName": "校园用户",
              "tagType": "1",
              "tagUp": "200"
            },
            "indexVice": [
              {
                "endTime": "2011-10-10",
                "startTime": "2011-10-10",
                "tagAssId": "002",
                "tagDesc": "4G用户",
                "tagId": "0001",
                "tagValue": "1"
              }, {
                "endTime": "2011-10-10",
                "startTime": "2011-10-10",
                "tagAssId": "002",
                "tagDesc": "非4G用户",
                "tagId": "0002",
                "tagValue": "0"
              }
            ]
          },
          {
            "indexInfo": {
              "endTime": "2011-10-10",
              "fieldName": "userStat",
              "startTime": "2011-10-10",
              "tabName": "tb_user",
              "tagDown": "100",
              "tagId": "001",
              "tagName": "用户状态",
              "tagType": "2",
              "tagUp": "200"
            },
            "indexVice": [
              {
                "endTime": "2011-10-10",
                "startTime": "2011-10-10",
                "tagAssId": "003",
                "tagDesc": "停机",
                "tagId": "0003",
                "tagValue": "1"
              }, {
                "endTime": "2011-10-10",
                "startTime": "2011-10-10",
                "tagAssId": "003",
                "tagDesc": "正常",
                "tagId": "0004",
                "tagValue": "0"
              }
            ]
          },
          {
            "indexInfo": {
              "endTime": "2011-10-10",
              "fieldName": "arpu",
              "startTime": "2011-10-10",
              "tabName": "DWV_M_USR_MB_USER_INFO",
              "tagDesc": "MOU",
              "tagDown": 0,
              "tagId": "30100",
              "tagLeve": "2",
              "tagName": "ARPU",
              "tagType": "3",
              "tagUp": 1000,
              "upTagId": "30000"
            }
          },
          {
            "indexInfo": {
              "endTime": "2011-10-10",
              "fieldName": "fourG",
              "startTime": "2011-10-10",
              "tabName": "DWV_M_USR_MB_USER_INFO",
              "tagDesc": "MOU",
              "tagDown": 0,
              "tagId": "30100",
              "tagLeve": "2",
              "tagName": "4G用户",
              "tagType": "3",
              "tagUp": 1000,
              "upTagId": "30000"
            }
          },
          {
            "indexInfo": {
              "endTime": "2011-10-10",
              "fieldName": "bandwidth",
              "startTime": "2011-10-10",
              "tabName": "DWV_M_USR_MB_USER_INFO",
              "tagDesc": "MOU",
              "tagDown": 0,
              "tagId": "30100",
              "tagLeve": "2",
              "tagName": "潜在宽带用户",
              "tagType": "3",
              "tagUp": 1000,
              "upTagId": "30000"
            }
          },
          {
            "indexInfo": {
              "endTime": "2011-10-10",
              "fieldName": "dou",
              "startTime": "2011-10-10",
              "tabName": "DWV_M_USR_MB_USER_INFO",
              "tagDesc": "MOU",
              "tagDown": 0,
              "tagId": "30100",
              "tagLeve": "2",
              "tagName": "DOU",
              "tagType": "3",
              "tagUp": 1000,
              "upTagId": "30000"
            }
          }
        ],
        userGroup: '213084',
        groupName: '测试名称'
      }
    })
})

// 计算用户群人数
router.post('/setSetpoint', function(req, res, next) {
  res
    .status(200)
    .send({
      resultCode: '001',
      resultContent: parseInt(Math.random() * 100000)
    })
})

// 保存用户群
router.post('/saveUserGroup', function(req, res, next) {
  res
    .status(200)
    .send({
      resultCode: '001',
      resultContent: '保存用户群成功'
    })
})

// 修改用户群
router.post('/updateUserGroup', function(req, res, next) {
  res
    .status(200)
    .send({
      resultCode: '001',
      resultContent: '修改用户群成功'
    })
})


module.exports = router