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
const user_1 = require("../model/user");
let default_1 = class default_1 {
    async index(id) {
        let result;
        try {
            result = await user_1.default.query();
        }
        catch (err) {
            console.log(err);
        }
        return {
            code: 200,
            id: result,
            type: typeof id
        };
    }
    async about(id) {
        let result;
        try {
            result = await user_1.default.add({
                name: 'hallo',
                age: id
            });
        }
        catch (err) {
            console.log(err);
        }
        return {
            code: 200,
            id: result,
            type: typeof id
        };
    }
};
__decorate([
    decorators_1.Get('/'),
    __param(0, decorators_1.Parse('number')), __param(0, decorators_1.Query('id'))
], default_1.prototype, "index", null);
__decorate([
    decorators_1.Get('/about/:id'),
    __param(0, decorators_1.Parse('string')), __param(0, decorators_1.Params('id'))
], default_1.prototype, "about", null);
default_1 = __decorate([
    decorators_1.Router('')
], default_1);
exports.default = default_1;
//# sourceMappingURL=index.js.map