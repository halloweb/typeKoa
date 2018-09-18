"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../router/decorators");
const request = require("request");
let default_1 = class default_1 {
    async index() {
        return {
            code: 'ok'
        };
    }
    async login(code, ctx, next) {
        let data = {
            appid: 'wxc824eec6dbbb2a33',
            secret: '3d981635b6d72b325f17355f80fef5d6',
            js_code: code,
            grant_type: 'authorization_code'
        };
        let options = {
            method: 'get',
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${data.appid}&secret=${data.secret}&js_code=${data.js_code}&grant_type=${data.grant_type}`,
        };
        let s = await requ(options);
        console.log(s['reqBody']);
        return {
            data: s['reqBody']
        };
    }
};
__decorate([
    decorators_1.Get('')
], default_1.prototype, "index", null);
__decorate([
    decorators_1.Post('/login'),
    __param(0, decorators_1.Param('body')('code'))
], default_1.prototype, "login", null);
default_1 = __decorate([
    decorators_1.Router('')
], default_1);
exports.default = default_1;
function requ(options) {
    return new Promise((resolve, rejects) => {
        request(options, (error, response, reqBody) => {
            let item = { response, reqBody };
            resolve(item);
        });
    });
}
//# sourceMappingURL=index.js.map