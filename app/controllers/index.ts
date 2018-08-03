import { Router, Get, Query, Parse, Params } from '../router/decorators'
import UInfo from '../model/user'
@Router('')
export default class {
  @Get('/')
  async index (@Parse('number') @Query('id') id: number) {
    let result: any;
    try {
      result = await UInfo.query()
    } catch (err) {
      console.log(err)
    }
    return {
      code: 200,
      id: result,
      type: typeof id
    }
  }

  @Get('/about/:id')
  async about (@Parse('string') @Params('id') id: string) {
    let result;
    try {
      result = await UInfo.add({
        name: 'hallo',
        age: id
      })
    } catch (err) {
      console.log(err)
    }
    return {
      code: 200,
      id: result,
      type: typeof id
    }
  }
}
