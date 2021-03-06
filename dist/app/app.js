"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const compose = require("koa-compose");
const bodyParse = require("koa-bodyparser");
const session = require("koa-session2");
const koaStatic = require("koa-static");
const koaViews = require("koa-views");
const log_1 = require("./util/log");
const path = require("path");
const redis_1 = require("./db/redis");
const proxy_1 = require("./middle/proxy");
require("./controllers");
const decorators_1 = require("./router/decorators");
const routers = [];
// 遍历所有添加了装饰器的Class，并创建对应的Router对象
decorators_1.routerList.forEach(item => {
    const { basename, constrcutor } = item;
    const router = new Router({
        prefix: basename
    });
    decorators_1.controllerList
        .filter(i => i.target === constrcutor.prototype)
        .forEach(async (controller) => {
        router[controller.type](controller.path, async (ctx, next) => {
            const args = [];
            // 获取当前函数对应的参数获取
            decorators_1.paramList
                .filter((param) => param.target === constrcutor.prototype &&
                param.method === controller.method)
                .map((param) => {
                const { index, key } = param;
                switch (param.position) {
                    case 'body':
                        args[index] = ctx.request.body[key];
                        break;
                    case 'header':
                        args[index] = ctx.headers[key];
                        break;
                    case 'cookie':
                        args[index] = ctx.cookies.get(key);
                        break;
                    case 'query':
                        args[index] = ctx.query[key];
                        break;
                    case 'params':
                        args[index] = ctx.params[key];
                        break;
                    default:
                        args[index] = ctx.request.body;
                }
            });
            // 获取当前函数对应的参数格式化
            decorators_1.parseList
                .filter((parse) => parse.target === constrcutor.prototype &&
                parse.method === controller.method)
                .map((parse) => {
                const { index } = parse;
                switch (parse.type) {
                    case 'number':
                        args[index] = Number(args[index]);
                        break;
                    case 'string':
                        args[index] = String(args[index]);
                        break;
                    case 'boolean':
                        args[index] = String(args[index]) === 'true';
                        break;
                }
            });
            // 调用实际的函数，处理业务逻辑
            try {
                const results = await controller.controller(...args, ctx, next);
                if (results) {
                    ctx.body = results;
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    });
    routers.push(router.routes());
});
const app = new Koa();
app.on('error', (err, ctx) => {
    log_1.log_date.error(err.message);
});
app.keys = ['jia mi a'];
app.use(session({
    store: new redis_1.RedisStore()
}));
// 模板配置
app.use(koaViews(path.join(__dirname, '/view'), {
    extension: 'ejs'
}));
// 请求体解析
app.use(bodyParse());
// 请求转发
app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico')
        return;
    console.log(ctx.session.user);
    if (!ctx.session.user && ctx.path !== '/login') {
        ctx.redirect('/login');
    }
    else {
        console.log(ctx.path);
        const startDate = new Date();
        const reg = /\.[jpg|gif|png|js]/i;
        if (reg.test(ctx.path)) {
            console.log('aa');
            ctx.set('Cache-Control', 'maxAge=86400000');
        }
        await next();
        const endDate = new Date();
        log_1.log_date.info(`${ctx.status}  ${ctx.method}  ${ctx.path}  ${endDate - startDate}ms`);
    }
});
app.use(koaStatic(path.join(__dirname, './public')));
app.use(proxy_1.default({ '/api': ' https://cnodejs.org' }));
app.use(compose(routers));
exports.default = app;
//# sourceMappingURL=app.js.map