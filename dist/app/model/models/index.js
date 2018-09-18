
const Sequelize = require('Sequelize')
// 创建数据库连接
const sequelize = new Sequelize(koa, root, root, {
    host: localhost,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})
// 数据库模型名称及路径
const models =[
    {
        "name": "Info",
        "path": "./course_info.js"
    }
]
// 数据模型输出
models.forEach(item => {
    module.exports [item.name] = require(item.path)(sequelize, Sequelize)
})
