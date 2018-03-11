export default {
  "resultCode" : "001",
  "resultContent" : [
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
    }, {
      "indexInfo": {
        "endTime": "2011-10-10",
        "fieldName": "dou1",
        "startTime": "2011-10-10",
        "tabName": "tb_user1",
        "tagDown": "",
        "tagId": "002",
        "tagName": "is4g",
        "tagType": "1",
        "tagUp": ""
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
    }, {
      "indexInfo": {
        "endTime": "2011-10-10",
        "fieldName": "dou2",
        "startTime": "2011-10-10",
        "tabName": "tb_user2",
        "tagDown": "",
        "tagId": "003",
        "tagName": "six",
        "tagType": "2",
        "tagUp": ""
      },
      "indexVice": [
        {
          "endTime": "2011-10-10",
          "startTime": "2011-10-10",
          "tagAssId": "003",
          "tagDesc": "男",
          "tagId": "0003",
          "tagValue": "1"
        }, {
          "endTime": "2011-10-10",
          "startTime": "2011-10-10",
          "tagAssId": "003",
          "tagDesc": "女",
          "tagId": "0004",
          "tagValue": "0"
        }
      ]
    }
  ]
}

const newAll = {
  "index": [
    {
      "indexInfo": {
        "endTime": "2011-10-10",
        "fieldName": "MOU",
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
        "fieldName": "DOU",
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
        "fieldName": "APP_TYPE_1",
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