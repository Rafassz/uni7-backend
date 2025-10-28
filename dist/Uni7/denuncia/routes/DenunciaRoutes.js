"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDenunciaRoutes = createDenunciaRoutes;
const express_1 = require("express");
const useCase_1 = require("../useCase");
function createDenunciaRoutes() {
    const router = (0, express_1.Router)();
    // Configurar os controllers
    const createController = (0, useCase_1.setupCreateDenunciaController)();
    const getByIdController = (0, useCase_1.setupGetByIdDenunciaController)();
    const updateController = (0, useCase_1.setupUpdateDenunciaController)();
    const deleteController = (0, useCase_1.setupDeleteDenunciaController)();
    // Definir as rotas CRUD
    router.post('/', (req, res) => createController.handle(req, res));
    router.get('/:id', (req, res) => getByIdController.handle(req, res));
    router.put('/:id', (req, res) => updateController.handle(req, res));
    router.delete('/:id', (req, res) => deleteController.handle(req, res));
    return router;
}
//# sourceMappingURL=DenunciaRoutes.js.map