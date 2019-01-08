// 路由模块
let path = require('path')
let handler = require('./handler.js')
module.exports = function (app, express) {
    // 静态资源
    app.use('/viewss/', express.static(path.join(__dirname, 'viewss')))
        .use('/node_modules/', express.static(path.join(__dirname, 'node_modules')))
        .use('/public/', express.static(path.join(__dirname, 'public')))
        // 渲染首页
        .get('/', function (req, res) {
            handler.students(req, res)
        })
        .get('/students', function (req, res) {
            handler.students(req, res)
        })
        // 渲染添加学生页面
        .get('/students/new', function (req, res) {
            handler.studentsNew(req, res)
        })
        // POST提交数据
        .post('/students/new', function (req, res) {
            handler.postAdd(req, res)
        })
        // 渲染编辑信息
        .get('/students/edit', function (req, res) {
            handler.studentsEdit(req, res)
        })
        // 处理编辑信息
        .post('/students/edit', function (req, res) {
            handler.postStudentsEdit(req, res)
        })
        // 通过id删除信息
        .get('/students/delete', function (req, res) {
            handler.studentsDelete(req, res)
        })


}