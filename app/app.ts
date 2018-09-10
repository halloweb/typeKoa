import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as compose from 'koa-compose'
import * as bodyParse from 'koa-bodyparser'
import * as session from 'koa-session'
import * as koaStatic from 'koa-static'
import * as koaViews from 'koa-views'
import { log_date } from './util/log'
import * as path from 'path'
import proxy from './middle/proxy'
import './controllers'
import { routerList, controllerList, paramList, parseList } from './router/decorators'

const routers: any[] = []
// 遍历所有添加了装饰器的Class，并创建对应的Router对象
routerList.forEach(item => {
    const { basename, constrcutor } = item
    const router = new Router({
        prefix: basename
    })

    controllerList
        .filter(i => i.target === constrcutor.prototype)
        .forEach(
            async (controller: {
                type: 'get' | 'post',
                path: string,
                method: string,
                controller: Function
            }) => {
                router[controller.type](controller.path, async (ctx: any, next) => {
                    const args: any[] = []
                    // 获取当前函数对应的参数获取
                    paramList
                        .filter(
                            (param: any) =>
                                param.target === constrcutor.prototype &&
                                param.method === controller.method
                        )
                        .map((param: any) => {
                            const { index, key } = param
                            switch (param.position) {
                                case 'body':
                                    args[index] = ctx.request.body[key]
                                    break
                                case 'header':
                                    args[index] = ctx.headers[key]
                                    break
                                case 'cookie':
                                    args[index] = ctx.cookies.get(key)
                                    break
                                case 'query':
                                    args[index] = ctx.query[key]
                                    break
                                case 'params':
                                    args[index] = ctx.params[key]
                                    break
                                    default:
                                    args[index] = ctx.request.body
                            }
                        })

                    // 获取当前函数对应的参数格式化
                    parseList
                        .filter(
                            (parse: any) =>
                                parse.target === constrcutor.prototype &&
                                parse.method === controller.method
                        )
                        .map((parse: any) => {
                            const { index } = parse
                            switch (parse.type) {
                                case 'number':
                                    args[index] = Number(args[index])
                                    break
                                case 'string':
                                    args[index] = String(args[index])
                                    break
                                case 'boolean':
                                    args[index] = String(args[index]) === 'true'
                                    break
                            }
                        })

                    // 调用实际的函数，处理业务逻辑
                    try {
                        const results = await controller.controller(...args, ctx, next)
                        if (results) {
                            ctx.body = results
                        }
                    } catch (err) {
                        console.log(err)
                    }
                })
            }
        )

    routers.push(router.routes())
})

const app = new Koa()
app.on('error', (err, ctx) => {
    log_date.error( err.message )
  });
app.keys = ['jia mi a']
const sessionConfig = {
    key: 'koa:sess',
    maxAge: 86400000, // 单位为ms
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false
}
app.use(session(sessionConfig, app))
// 模板配置
app.use(koaViews(path.join(__dirname, '/view'), {
    extension: 'ejs'
}));
// 请求体解析
app.use(bodyParse())
// 请求转发
app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico') return;
    console.log(ctx.session.user)
    if (!ctx.session.user && ctx.path !== '/login') {
         ctx.redirect('/login')
    } else {
        console.log(ctx.path)
        const startDate: any = new Date()

        const reg = /\.[jpg|gif|png|js]/i
        if (reg.test(ctx.path)) {
            console.log('aa')
          ctx.set('Cache-Control', 'maxAge=86400000')
        }
        await next()
        const endDate: any = new Date()
        log_date.info(`${ctx.status}  ${ctx.method}  ${ctx.path}  ${endDate - startDate}ms`  );
    }
})
app.use(koaStatic(path.join(__dirname , './public')))
app.use(proxy({'/api': ' https://cnodejs.org'}))
app.use(compose(routers))
export default app