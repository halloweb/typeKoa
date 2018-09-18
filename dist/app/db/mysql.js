"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const config_1 = require("../config");
const sequelize = new Sequelize(config_1.default.db.database, config_1.default.db.userName, config_1.default.db.passWord, {
    host: config_1.default.db.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
exports.default = sequelize;
//# sourceMappingURL=mysql.js.map