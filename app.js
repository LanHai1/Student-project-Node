let express = require('express')
let config = require('./config.js')
let router = require('./router.js')
let path = require('path')
let bodyParser = require('body-parser')
let app = express()
// 配置渲染模块
app.engine('html', require('express-art-template'))
// 修改默认读取views 改为 viewss
app.set('views', path.join(__dirname, 'viewss'))
// 配置获取POST请求来的数据
app.use(bodyParser.urlencoded({ extended: false }))
router(app, express)

app.listen(config.port, function () {
    console.log(`http://localhost:${config.port}`)
})