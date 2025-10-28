"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCreateDenunciaController = void 0;
const DenunciaRepositoryFactory_1 = require("../../repository/implementations/DenunciaRepositoryFactory");
const controller_1 = require("./controller");
const useCase_1 = require("./useCase");
const setupCreateDenunciaController = () => {
    const denunciaRepository = DenunciaRepositoryFactory_1.DenunciaRepositoryFactory.createFromEnv();
    const createDenunciaUseCase = new useCase_1.CreateDenunciaUseCase({
        repository: {
            DenunciaRepository: denunciaRepository
        }
    });
    const createDenunciaController = new controller_1.CreateDenunciaController({
        useCase: {
            createDenunciaUseCase
        }
    });
    return createDenunciaController;
};
exports.setupCreateDenunciaController = setupCreateDenunciaController;
//# sourceMappingURL=setupController.js.map