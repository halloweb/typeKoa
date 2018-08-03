import * as Sequelize from 'sequelize'
import config from '../config'

const sequelize = new Sequelize(config.db.database, config.db.userName, config.db.passWord, {
        host: config.db.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    }
)
export default sequelize