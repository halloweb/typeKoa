"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const log_1 = require("../util/log");
const proxy = (opts) => async (ctx, next) => {
    let host;
    const flag = Object.keys(opts).some(v => {
        let reg = `^${v}`;
        let patrn = new RegExp(reg);
        if (patrn.test(ctx.request.url)) {
            host = opts[v];
            return true;
        }
        else {
            return false;
        }
    });
    if (!flag) {
        await next();
    }
    else {
        let result = ctx.body;
        const data = ctx.request.body;
        const type = ctx.get('Content-Type');
        const content = ctx.get('Content-length');
        ;
        let options = {
            method: ctx.method,
            url: host + ctx.path,
        };
        if (type) {
            options.headers['Content-Type'] = type;
        }
        else if (content) {
            options.headers['Content-length'] = content;
        }
        if (data) {
            if (type) {
                if (type.indexOf('form') >= 0) {
                    options.form = JSON.parse(JSON.stringify(data));
                }
                else if (type.indexOf('json') >= 0) {
                    options.body = data;
                    options.json = true;
                }
            }
        }
        if (ctx.query) {
            let f = '';
            for (let i in ctx.query) {
                f += i + '=' + ctx.query[i] + '&';
            }
            if (f !== '') {
                f = f.slice(0, -1);
                options.url += '?' + f;
            }
        }
        const s = await requ(options);
        ctx.response.set({
            'content-type': s['response'].headers['content-type']
        });
        ctx.body = s['reqBody'];
    }
};
function requ(options) {
    return new Promise((resolve, rejects) => {
        request(options, (error, response, reqBody) => {
            log_1.log_transmit.info(`transmit  ${options.url}`);
            let item = { response, reqBody };
            resolve(item);
        });
    });
}
exports.default = proxy;
//# sourceMappingURL=proxy.js.map