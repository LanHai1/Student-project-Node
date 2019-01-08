// 业务模块
let config = require('./config.js')
let fs = require('fs')
// 渲染首页
module.exports.students = function (req, res) {
    readData(function (list) {
        res.render('index.html', {
            fruits: ['苹果', '橘子', '菠萝'],
            students: list
        })
    })
}
// 渲染添加学生页面
module.exports.studentsNew = function (req, res) {
    res.render('new.html')
}
// 渲染编辑信息
module.exports.studentsEdit = function (req, res) {
    let thisStudentId = Number(req.query.id)
    readData(function (list) {
        let thisStudent = null
        for (let i = 0; i < list.length; i++) {
            if (thisStudentId === list[i].id) {
                thisStudent = list[i]
                break
            }
        }
        if (thisStudent) {
            res.render('edit.html', { student: thisStudent })
        } else {
            res.send(`Page Not Found`)
        }

    })
}
// 处理编辑信息
module.exports.postStudentsEdit = function (req, res) {
    let thisStudentId = Number(req.query.id)
    readData(function (list) {
        list.splice(thisStudentId, 1, req.body); // 这句话有问题
        writeData(JSON.stringify(list), function () {
            res.redirect('/')
        })
    })
}
// POST提交数据
module.exports.postAdd = function (req, res) {
    readData(function (list) {
        req.body.id = list.length
        list.push(req.body)
        writeData(JSON.stringify(list), function () {
            res.redirect('/')
        })
    })
}
// 通过id删除信息
module.exports.studentsDelete = function (req, res) {
    // 信息id
    let thisStudentId = Number(req.query.id)
    readData(function (list) {
        list.splice(thisStudentId, 1);
        writeData(JSON.stringify(list), function () {
            res.redirect('/')
        })
    })
}
/**
 * 读取数据
 * @param {*} callback 
 */
function readData(callback) {
    fs.readFile(config.dataPath, 'utf8', function (err, data) {
        if (err && err.code != 'ENOENT') throw err
        let list = JSON.parse(data || '[]')
        callback(list)
    })
}
/**
 * 写入数据
 * @param {string} list 数据
 * @param {*} callback 
 */
function writeData(list, callback) {
    fs.writeFile(config.dataPath, list, 'utf8', function (err) {
        if (err) throw err
        callback()
    })
}

