import { Router, Get, Query, Parse, Body, Post } from '../router/decorators'
import UInfo from '../model/user'
@Router('')
export default class {
  @Get('/')
  async index (@Parse('number') @Query('id') id: number) {
    let result: any;
    let info = {
      sname: '小红',
      sex: '女',
      sdept: '信息',
      sage: '18'
    }
    try {
      result = await UInfo.add(info)
    } catch (err) {
      console.log('ss')
    }
    return {
      code: 200,
      id,
      type: typeof id
    }
  }

  @Post('/detail')
  detail (
    @Parse('number') @Query('id') id: number,
    @Parse('number') @Body('age') age: number
  ) {
    return {
      code: 200,
      age: age + 1
    }
  }
}