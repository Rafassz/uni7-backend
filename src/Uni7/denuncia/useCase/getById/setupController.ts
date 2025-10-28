import { DenunciaRepositoryFactory } from "../../repository/implementations/DenunciaRepositoryFactory"
import { GetByIdDenunciaController } from "./controller"
import { GetByIdDenunciaUseCase } from "./useCase"

export const setupGetByIdDenunciaController = () => {
    const denunciaRepository = DenunciaRepositoryFactory.createFromEnv()

    const getByIdDenunciaUseCase = new GetByIdDenunciaUseCase({
        repository: {
            DenunciaRepository: denunciaRepository
        }
    })

    const getByIdDenunciaController = new GetByIdDenunciaController({
        useCase: {
            getByIdDenunciaUseCase
        }
    })

    return getByIdDenunciaController
}