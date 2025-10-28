import { IDataBaseError, IInvalidFieldError, INotFoundError, IRequiredFieldError, IResultError, IUnknownError, RequiredFieldError, NotFoundError, Result, UnknownError } from "../../../../utils/result";
import { IDenunciaRepository } from '../../repository';
import { IRequest, IResponse } from './DTO';

type Errors = IUnknownError | IRequiredFieldError | INotFoundError | IInvalidFieldError | IDataBaseError

export interface IGetByIdDenunciaUseCase {
    execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>>
}

export class GetByIdDenunciaUseCase implements IGetByIdDenunciaUseCase {
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

    // @LogThis('GetByIdDenunciaUseCase')
    async execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>> {
        try {
            if (!request.id || request.id <= 0) {
                return Result.fail(RequiredFieldError({
                    key: 'ID da denúncia'
                }))
            }

            const id = Number(request.id)

            const findDenuncia = await this._denunciaRepository.findById(id)

            if (findDenuncia.isFailure) {
                return Result.fail(findDenuncia.error!)
            }

            const denuncia = findDenuncia.getValue()!

            if (!denuncia) {
                return Result.fail(NotFoundError({
                    key: 'Denúncia'
                }))
            }

            return Result.ok({
                Denuncia: denuncia
            })

        } catch (error) {
            return Result.fail(UnknownError({ error }))
        }
    }
}