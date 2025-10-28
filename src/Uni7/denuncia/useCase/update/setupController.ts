import { DenunciaRepositoryFactory } from "../../repository/implementations/DenunciaRepositoryFactory"
import { UpdateDenunciaController } from "./controller"
import { UpdateDenunciaUseCase } from "./useCase"

export const setupUpdateDenunciaController = () => {
    const denunciaRepository = DenunciaRepositoryFactory.createFromEnv()

    const updateDenunciaUseCase = new UpdateDenunciaUseCase({
        repository: {
            DenunciaRepository: denunciaRepository
        }
    })

    const updateDenunciaController = new UpdateDenunciaController({
        useCase: {
            updateDenunciaUseCase
        }
    })

    return updateDenunciaController
}