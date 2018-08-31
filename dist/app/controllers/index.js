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
let default_1 = class default_1 {
    async index(ctx) {
        await ctx.render('index');
    }
    async enter(ctx) {
        await ctx.render('login', { title: '登录' });
    }
    async login(data, ctx, next) {
        ctx.session.user = data;
        return {
            code: 200,
            id: '1',
            info: data
        };
    }
    async about(id) {
        let result;
        // try {
        //   result = await UInfo.add({
        //     name: 'hallo',
        //     age: id
        //   })
        // } catch (err) {
        //   console.log(err)
        // }
        return {
            code: 200,
            id: 'result',
            type: typeof id
        };
    }
};
__decorate([
    decorators_1.Get('')
], default_1.prototype, "index", null);
__decorate([
    decorators_1.Get('/login')
], default_1.prototype, "enter", null);
__decorate([
    decorators_1.Post('/login'),
    __param(0, decorators_1.Param('')('data'))
], default_1.prototype, "login", null);
__decorate([
    decorators_1.Get('/api/v1/topics'),
    __param(0, decorators_1.Parse('string')), __param(0, decorators_1.Params('id'))
], default_1.prototype, "about", null);
default_1 = __decorate([
    decorators_1.Router('')
], default_1);
exports.default = default_1;
//# sourceMappingURL=index.js.map