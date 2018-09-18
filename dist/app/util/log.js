"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const path = require("path");
log4js.configure({
    appenders: {
        log_file: {
            type: 'file',
            filename: path.join(__dirname, '../logs/file/file.log'),
            maxLogSize: 104857500,
            backups: 10,
            // compress : true,//是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
            encoding: 'utf-8',
            numBackups: 5,
            path: '/file'
        },
        log_transmit: {
            type: 'file',
            filename: path.join(__dirname, '../logs/file/transmit.log'),
            maxLogSize: 104857500,
            backups: 10,
            // compress : true,//是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
            encoding: 'utf-8',
            numBackups: 5,
            path: '/file'
        },
        log_date: {
            type: 'dateFile',
            filename: path.join(__dirname, '../logs/date/date.log'),
            pattern: 'yyyy-MM-dd-hh.log',
            // compress: true,
            encoding: 'utf-8',
            alwaysIncludePattern: true,
            maxLogSize: 104857500,
            numBackups: 3,
            path: '/date'
        },
        stdout: {
            type: 'stdout'
        }
    },
    categories: {
        default: { appenders: ['stdout'], level: 'all' },
        log_file: { appenders: ['log_file', 'stdout'], level: 'all' },
        log_date: { appenders: ['log_date', 'stdout'], level: 'all' },
        log_transmit: { appenders: ['log_transmit', 'stdout'], level: 'all' }
    }
});
exports.log_file = log4js.getLogger('log_file');
exports.log_date = log4js.getLogger('log_date');
exports.log_transmit = log4js.getLogger('log_transmit');
exports.default = {
    log_file: exports.log_file,
    log_date: exports.log_date,
    log_transmit: exports.log_transmit
};
//# sourceMappingURL=log.js.map