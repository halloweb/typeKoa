import { Router, Get, Query, Parse, Params, Body, Post, Param } from '../router/decorators'
import UInfo from '../model/user'
@Router('')
export default class {

  @Post('/login')
  async login (@Param('')('data') data: object, ctx, next) {

  }
}