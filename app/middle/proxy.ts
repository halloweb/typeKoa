import * as request from 'request'
import { log_transmit } from '../util/log'
import * as path from 'path'
import * as fs from 'fs'
const proxy =  (opts) => async (ctx, next) => {
    let host: string
    const flag = Object.keys(opts).some( v => {
        let reg = `^${v}`
        let patrn = new RegExp(reg)
        if (patrn.test(ctx.request.url)) {
            host = opts[v];
            return true
        } else {
            return false
        }
    })
    if (!flag) {
       await next()
    } else {
        let result = ctx.body;
        const data = ctx.request.body
        const type =  ctx.get('Content-Type')
        const content = ctx.get('Content-length')
        interface T {
            method: string,
            url: string,
            headers?: object,
            form?: string,
            body?: object,
            json?: boolean
        };
        let options: T = {
           method: ctx.method,
           url: host + ctx.path,
        }
        if (type) {
            options.headers['Content-Type'] = type
        } else if (content) {
            options.headers['Content-length'] = content
        }
        if (data) {
            if (type) {
              if (type.indexOf('form') >= 0) {
                options.form = JSON.parse(JSON.stringify(data))
              } else if (type.indexOf('json') >= 0) {
                options.body = data
                options.json = true
              }
            }
          }
          if (ctx.query) {
            let f = ''
            for (let i in ctx.query) {
              f += i + '=' + ctx.query[i] + '&'
            }
            if (f !== '') {
              f = f.slice(0, -1)
              options.url += '?' + f
            }
          }

       const s = await requ(options)
       ctx.response.set({
           'content-type': s['response'].headers['content-type']
       })
        ctx.body = s['reqBody']
    }
}
function requ (options) {
  return new Promise((resolve, rejects) => {
    request(options, (error, response, reqBody) => {
        log_transmit.info(`transmit  ${options.url}`)
        let item = {response, reqBody}
        resolve(item)
    })
  })
}
export default proxy