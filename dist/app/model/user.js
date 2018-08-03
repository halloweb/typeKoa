"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const mysql_1 = require("../db/mysql");
const User = mysql_1.default.define('user', {
    id: {
        type: Sequelize.BIGINT(50),
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    age: Sequelize.STRING(50)
}, {
    timestamps: false
});
class UInfo {
    static async add(info) {
        try {
            const result = await User.create(info);
            return result;
        }
        catch (err) {
            console.log(err);
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
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.default = UInfo;
//# sourceMappingURL=user.js.map