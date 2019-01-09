// 业务模块
let config = require('./config.js')
let fs = require('fs')

// 渲染首页
module.exports.students = function (req, res) {
    readData(function (dict) {
        let list = []
        for (const key in dict) {
            list.push(dict[key])
        }
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
    let thisStudentId = String(req.query.id)
    readData(function (dict) {
        let thisStudent = null
        thisStudent = dict[thisStudentId]
        if (thisStudent) {
            res.render('edit.html', { student: thisStudent })
        } else {
            res.send(`Page Not Found`)
        }

    })
}
// 处理编辑信息
module.exports.postStudentsEdit = function (req, res) {
    let thisStudentId = Number(req.body.id)
    console.log(thisStudentId)
    readData(function (dict) {
        dict[thisStudentId + ''] = req.body; // 这句话有问题
        writeData(JSON.stringify(dict), function () {
            res.redirect('/')
        })
    })
}
// POST提交数据
module.exports.postAdd = function (req, res) {
    readData(function (dict) {
        getId(id => {
            req.body.id = id + 1;
            writeId(id + 1)
            console.log('id=', id)
            dict[id + 1] = req.body
            writeData(JSON.stringify(dict), function () {
                res.redirect('/')
            })
        })

    })
}
// 通过id删除信息
module.exports.studentsDelete = function (req, res) {
    // 信息id
    let thisStudentId = Number(req.query.id)
    console.log('thisStudentId=', thisStudentId)
    readData(function (dict) {
        console.log(dict.length)
        dict[thisStudentId] = undefined;
        // 最后一个信息 直接清空数组
        // if(dict.length === 1){
        //     dict = [];
        //     console.log(`清空数组`)
        // }
        writeData(JSON.stringify(dict), function () {
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
        let dict = JSON.parse(data || '{}')
        callback(dict)
    })
}
/**
 * 写入数据
 * @param {string} dict 数据
 * @param {*} callback 
 */
function writeData(dict, callback) {
    fs.writeFile(config.dataPath, dict, 'utf8', function (err) {
        if (err) throw err
        callback()
    })
}
/**
 * 读取id
 * @param {*} callback 
 */
function getId(callback) {
    fs.readFile(config.idPath, 'utf8', function (err, data) {
        if (err) throw err
        let dict = JSON.parse(data)
        callback(dict.id)
    })
}
/**
 * 写入id
 * @param {number} id 
 * @param {*} callback 
 */
function writeId(id, callback) {
    let map = { 'id': id }
    fs.writeFile(config.idPath, JSON.stringify(map), 'utf8', function (err) {
        if (err) throw err
        if (callback) {
            callback()
        }
    })
}

