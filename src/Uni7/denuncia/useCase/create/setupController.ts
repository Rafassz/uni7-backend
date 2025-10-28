import { DenunciaRepositoryFactory } from "../../repository/implementations/DenunciaRepositoryFactory"
import { CreateDenunciaController } from "./controller"
import { CreateDenunciaUseCase } from "./useCase"

export const setupCreateDenunciaController = () => {
    const denunciaRepository = DenunciaRepositoryFactory.createFromEnv()

    const createDenunciaUseCase = new CreateDenunciaUseCase({
        repository: {
            DenunciaRepository: denunciaRepository
        }
    })

    const createDenunciaController = new CreateDenunciaController({
        useCase: {
            createDenunciaUseCase
        }
    })

    return createDenunciaController
}