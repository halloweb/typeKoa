import * as Sequelize from 'sequelize'
import sequelize from '../db/mysql'
const  User = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT(50),
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    age: Sequelize.STRING(50)
}, {
    timestamps: false
})
class UInfo {
  static async add(info) {
        try {
         const result = await User.create(info);
           return result;
        } catch (err) {
          console.log(err)
        }
    }
  static async query() {
    try {
            const result = await User.findAll({
                order: [
                    ['id', 'DESC']
                ]
            });
            return result;
       } catch (err) {
            console.log(err)
       }
  }
}

export default UInfo