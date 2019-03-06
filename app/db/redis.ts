import * as Redis from 'ioredis'
import { Store } from 'koa-session2'
const redis = new Redis(6379, '39.105.221.153')
export class RedisStore extends Store {
  constructor() {
    super()
  }
  async get(sid: any, ctx: any) {
    let data = await redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }
  async set(data: any, { sid = Store.getID(24), maxAge = 1000000 } = {}, ctx) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await redis.set(`SESSION:${sid}`, JSON.stringify(data), 'EX', maxAge);
    } catch (e) { }
    return sid;
  }
  async destroy(sid: any, ctx: any) {
    return await redis.del(`SESSION:${sid}`);
  }
}
export default redis