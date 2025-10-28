"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDeleteDenunciaController = void 0;
const DenunciaRepositoryFactory_1 = require("../../repository/implementations/DenunciaRepositoryFactory");
const controller_1 = require("./controller");
const useCase_1 = require("./useCase");
const setupDeleteDenunciaController = () => {
    const denunciaRepository = DenunciaRepositoryFactory_1.DenunciaRepositoryFactory.createFromEnv();
    const deleteDenunciaUseCase = new useCase_1.DeleteDenunciaUseCase({
        repository: {
            DenunciaRepository: denunciaRepository
        }
    });
    const deleteDenunciaController = new controller_1.DeleteDenunciaController({
        useCase: {
            deleteDenunciaUseCase
        }
    });
    return deleteDenunciaController;
};
exports.setupDeleteDenunciaController = setupDeleteDenunciaController;
//# sourceMappingURL=setupController.js.map