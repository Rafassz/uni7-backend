import { IDataBaseError, IInvalidFieldError, INotFoundError, IRequiredFieldError, IResultError, IUnknownError, RequiredFieldError, NotFoundError, Result, UnknownError } from "../../../../utils/result";
import { IDenunciaRepository } from '../../repository';
import { IRequest, IResponse } from './DTO';

type Errors = IUnknownError | IRequiredFieldError | INotFoundError | IInvalidFieldError | IDataBaseError

export interface IDeleteDenunciaUseCase {
    execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>>
}

export class DeleteDenunciaUseCase implements IDeleteDenunciaUseCase {
    private readonly _denunciaRepository: IDenunciaRepository

    constructor(
        props: {
            repository: {
                DenunciaRepository: IDenunciaRepository
            }
        }
    ) {
        this._denunciaRepository = props.repository.DenunciaRepository
    }

    // @LogThis('DeleteDenunciaUseCase')
    async execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>> {
        try {
            if (!request.id || request.id <= 0) {
                return Result.fail(RequiredFieldError({
                    key: 'ID da denúncia'
                }))
            }

            const id = Number(request.id)

            // Verificar se a denúncia existe antes de tentar deletar
            const findDenuncia = await this._denunciaRepository.findById(id)

            if (findDenuncia.isFailure) {
                return Result.fail(findDenuncia.error!)
            }

            const existingDenuncia = findDenuncia.getValue()!

            if (!existingDenuncia) {
                return Result.fail(NotFoundError({
                    key: 'Denúncia'
                }))
            }

            const deleteDenuncia = await this._denunciaRepository.delete(id)

            if (deleteDenuncia.isFailure) {
                return Result.fail(deleteDenuncia.error!)
            }

            const deleted = deleteDenuncia.getValue()!

            if (!deleted) {
                return Result.fail(UnknownError({
                    error: 'Falha ao deletar denúncia'
                }))
            }

            return Result.ok({
                success: true
            })

        } catch (error) {
            return Result.fail(UnknownError({ error }))
        }
    }
}