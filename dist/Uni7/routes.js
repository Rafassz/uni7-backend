"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppRouter = createAppRouter;
const express_1 = require("express");
const denuncia_1 = require("./denuncia");
function createAppRouter() {
    const router = (0, express_1.Router)();
    // Registrar rotas da denúncia
    router.use('/denuncias', (0, denuncia_1.createDenunciaRoutes)());
    return router;
}
//# sourceMappingURL=routes.js.map