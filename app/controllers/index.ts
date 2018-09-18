import { Router, Get, Query, Parse, Params, Body, Post, Param } from '../router/decorators'
import * as request from 'request'
@Router('')
export default class {
  @Get('')
  async index() {
    return {
      code: 'ok'
    }
  }
  @Post('/login')
  async login (@Param('body')('code') code: object, ctx, next) {
    let  data = {
            appid: 'wxc824eec6dbbb2a33',
            secret: '3d981635b6d72b325f17355f80fef5d6',
            js_code: code,
            grant_type: 'authorization_code'
          }
    let options = {
      method: 'get',
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${data.appid}&secret=${data.secret}&js_code=${data.js_code}&grant_type=${data.grant_type}`,
    }
    let s = await requ(options)
    console.log(s['reqBody'])
    return {
        data: s['reqBody']
    }
  }
}
function requ (options) {
  return new Promise((resolve, rejects) => {
    request(options, (error, response, reqBody) => {
        let item = {response, reqBody}
        resolve(item)
    })
  })
}