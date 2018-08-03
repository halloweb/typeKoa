"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerList = [];
exports.controllerList = [];
exports.parseList = [];
exports.paramList = [];
function Router(basename = '') {
    return (constrcutor) => {
        exports.routerList.push({
            constrcutor,
            basename
        });
    };
}
exports.Router = Router;
function Method(type) {
    return (path) => (target, name, descriptor) => {
        exports.controllerList.push({
            target,
            type,
            path,
            method: name,
            controller: descriptor.value
        });
    };
}
exports.Method = Method;
function Parse(type) {
    return (target, name, index) => {
        exports.parseList.push({
            target,
            type,
            method: name,
            index
        });
    };
}
exports.Parse = Parse;
function Param(position) {
    return (key) => (target, name, index) => {
        exports.paramList.push({
            target,
            key,
            position,
            method: name,
            index
        });
    };
}
exports.Param = Param;
exports.Body = Param('body');
exports.Header = Param('header');
exports.Cookie = Param('cookie');
exports.Query = Param('query');
exports.Params = Param('params');
exports.Get = Method('get');
exports.Post = Method('post');
//# sourceMappingURL=decorators.js.map