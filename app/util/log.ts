import * as log4js from 'log4js'
import * as path from 'path'
log4js.configure({
    appenders: {
                  log_file: {
                       type : 'file',
                       filename: path.join(__dirname, '../logs/file/file.log'), // 文件目录，当目录文件或文件夹不存在时，会自动创建
                       maxLogSize : 104857500, // 文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
                       backups : 10, // 当文件内容超过文件存储空间时，备份文件的数量
                       // compress : true,//是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
                       encoding : 'utf-8', // default "utf-8"，文件的编码
                       numBackups: 5, // keep five backup files
                       path: '/file'
                 },
                 log_transmit: {
                    type : 'file',
                    filename: path.join(__dirname, '../logs/file/transmit.log'), // 文件目录，当目录文件或文件夹不存在时，会自动创建
                    maxLogSize : 104857500, // 文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
                    backups : 10, // 当文件内容超过文件存储空间时，备份文件的数量
                    // compress : true,//是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
                    encoding : 'utf-8', // default "utf-8"，文件的编码
                    numBackups: 5, // keep five backup files
                    path: '/file'
              },
                 log_date: {
                        type: 'dateFile',
                        filename: path.join(__dirname, '../logs/date/date.log'),
                        pattern: 'yyyy-MM-dd-hh.log',
                        // compress: true,
                        encoding : 'utf-8', // default "utf-8"，文件的编码
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
        log_file: { appenders: ['log_file', 'stdout'], level: 'all'},
        log_date: { appenders: ['log_date', 'stdout'], level: 'all'},
        log_transmit: {appenders: ['log_transmit', 'stdout'], level: 'all'}
    }
})

export const log_file = log4js.getLogger('log_file');
export const log_date = log4js.getLogger('log_date');
export const log_transmit = log4js.getLogger('log_transmit');
export default {
    log_file,
    log_date,
    log_transmit
}