import { DenunciaRepositoryFactory } from "../../repository/implementations/DenunciaRepositoryFactory"
import { DeleteDenunciaController } from "./controller"
import { DeleteDenunciaUseCase } from "./useCase"

export const setupDeleteDenunciaController = () => {
    const denunciaRepository = DenunciaRepositoryFactory.createFromEnv()

    const deleteDenunciaUseCase = new DeleteDenunciaUseCase({
        repository: {
            DenunciaRepository: denunciaRepository
        }
    })

    const deleteDenunciaController = new DeleteDenunciaController({
        useCase: {
            deleteDenunciaUseCase
        }
    })

    return deleteDenunciaController
}