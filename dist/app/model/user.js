"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const mysql_1 = require("../db/mysql");
const User = mysql_1.default.define('student', {
    sid: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    sname: Sequelize.STRING(11),
    sex: Sequelize.STRING(10),
    sdept: Sequelize.STRING(20),
    sage: Sequelize.STRING(11)
}, {
    freezeTableName: true,
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
                    ['sid', 'DESC']
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