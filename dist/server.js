"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app/app");
const server = app_1.default.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
exports.default = server;
//# sourceMappingURL=server.js.map