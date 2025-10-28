"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupUpdateDenunciaController = void 0;
const DenunciaRepositoryFactory_1 = require("../../repository/implementations/DenunciaRepositoryFactory");
const controller_1 = require("./controller");
const useCase_1 = require("./useCase");
const setupUpdateDenunciaController = () => {
    const denunciaRepository = DenunciaRepositoryFactory_1.DenunciaRepositoryFactory.createFromEnv();
    const updateDenunciaUseCase = new useCase_1.UpdateDenunciaUseCase({
        repository: {
            DenunciaRepository: denunciaRepository
        }
    });
    const updateDenunciaController = new controller_1.UpdateDenunciaController({
        useCase: {
            updateDenunciaUseCase
        }
    });
    return updateDenunciaController;
};
exports.setupUpdateDenunciaController = setupUpdateDenunciaController;
//# sourceMappingURL=setupController.js.map