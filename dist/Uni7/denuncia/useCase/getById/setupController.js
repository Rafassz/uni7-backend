"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGetByIdDenunciaController = void 0;
const DenunciaRepositoryFactory_1 = require("../../repository/implementations/DenunciaRepositoryFactory");
const controller_1 = require("./controller");
const useCase_1 = require("./useCase");
const setupGetByIdDenunciaController = () => {
    const denunciaRepository = DenunciaRepositoryFactory_1.DenunciaRepositoryFactory.createFromEnv();
    const getByIdDenunciaUseCase = new useCase_1.GetByIdDenunciaUseCase({
        repository: {
            DenunciaRepository: denunciaRepository
        }
    });
    const getByIdDenunciaController = new controller_1.GetByIdDenunciaController({
        useCase: {
            getByIdDenunciaUseCase
        }
    });
    return getByIdDenunciaController;
};
exports.setupGetByIdDenunciaController = setupGetByIdDenunciaController;
//# sourceMappingURL=setupController.js.map