var express = require('express')
var app = express()
var router = require('./routes')
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 配置路由
router(app)

// 启动服务
app.listen(3000, function () {
  console.log('Express is listening port 3000')
})