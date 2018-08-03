import { Router, Get, Query, Parse, Body, Post } from '../router/decorators'

@Router('')
export default class {
  @Get('/')
  index (@Parse('number') @Query('id') id: number) {
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