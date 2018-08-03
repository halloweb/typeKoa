"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
router.get('/', (ctx, next) => {
    ctx.body = 'Hello';
});
router.get('/todo', (ctx, next) => {
    ctx.body = 'Todo page';
});
exports.default = router;
//# sourceMappingURL=index.js.map