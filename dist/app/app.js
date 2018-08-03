"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const compose = require("koa-compose");
const bodyParse = require("koa-bodyparser");
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
                const results = await controller.controller(...args);
                ctx.body = results;
            }
            catch (err) {
                console.log(err);
            }
        });
    });
    routers.push(router.routes());
});
const app = new Koa();
app.use(bodyParse());
app.use(compose(routers));
exports.default = app;
//# sourceMappingURL=app.js.map