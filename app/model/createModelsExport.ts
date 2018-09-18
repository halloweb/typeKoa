import * as fs from 'fs'
import config from '../config'
const  files = fs.readdirSync('./models')
let models = []
files.forEach(item => {
   if (item !== 'index.js' && item.indexOf('.map') === -1) {
    let names = item.split('.')[0].split('_')
    let name = ''
    for (let i = 1; i < names.length; i++) {
        name += names[i].substring(0, 1).toUpperCase() + names[i].substring(1)
    }
    models.push({name: name, path: './' + item})
    }
})

const template = `
const Sequelize = require('Sequelize')
// 创建数据库连接
const sequelize = new Sequelize(${config.db.database}, ${config.db.userName}, ${config.db.passWord}, {
    host: ${config.db.host},
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})
// 数据库模型名称及路径
const models =${JSON.stringify(models, null, 4)}
// 数据模型输出
models.forEach(item => {
    export [item.name] = require(item.path)(sequelize, Sequelize)
})
`
fs.writeFile('./models/index.js', template, () => {
    console.log('创建成功')
})