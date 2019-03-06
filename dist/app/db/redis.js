"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
const koa_session2_1 = require("koa-session2");
const redis = new Redis(6379, '39.105.221.153');
class RedisStore extends koa_session2_1.Store {
    constructor() {
        super();
    }
    async get(sid, ctx) {
        let data = await redis.get(`SESSION:${sid}`);
        return JSON.parse(data);
    }
    async set(data, { sid = koa_session2_1.Store.getID(24), maxAge = 1000000 } = {}, ctx) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await redis.set(`SESSION:${sid}`, JSON.stringify(data), 'EX', maxAge);
        }
        catch (e) { }
        return sid;
    }
    async destroy(sid, ctx) {
        return await redis.del(`SESSION:${sid}`);
    }
}
exports.RedisStore = RedisStore;
exports.default = redis;
//# sourceMappingURL=redis.js.map