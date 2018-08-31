import { Router, Get, Query, Parse, Params, Body, Post, Param } from '../router/decorators'
import UInfo from '../model/user'
@Router('')
export default class {
  @Get('')
  async index (ctx) {
     await ctx.render('index')
  }
  @Get('/login')
  async enter (ctx) {
    await ctx.render('login', {title: '登录'})
  }
  @Post('/login')
  async login (@Param('')('data') data: object, ctx, next) {
    ctx.session.user = data
    return {
      code: 200,
      id: '1',
      info: data
    }
  }

  @Get('/api/v1/topics')
  async about (@Parse('string') @Params('id') id: string) {
    let result;
    // try {
    //   result = await UInfo.add({
    //     name: 'hallo',
    //     age: id
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
    return {
      code: 200,
      id: 'result',
      type: typeof id
    }
  }
}
