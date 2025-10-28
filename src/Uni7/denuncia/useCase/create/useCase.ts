import { IDataBaseError, IInvalidFieldError, INotFoundError, IRequiredFieldError, IResultError, IUnknownError, RequiredFieldError, Result, UnknownError } from "../../../../utils/result";
import { IDenunciaRepository } from '../../repository';
import { IRequest, IResponse } from './DTO';

type Errors = IUnknownError | IRequiredFieldError | INotFoundError | IInvalidFieldError | IDataBaseError

export interface ICreateDenunciaUseCase {
    execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>>
}

export class CreateDenunciaUseCase implements ICreateDenunciaUseCase {
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

    // @LogThis('CreateDenunciaUseCase')
    async execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>> {
        try {
            if (!request.Nome) {
                return Result.fail(RequiredFieldError({
                    key: 'Nome'
                }))
            }

            if (!request.Descricao) {
                return Result.fail(RequiredFieldError({
                    key: 'Descrição'
                }))
            }

            if (typeof request.Ativa !== 'boolean') {
                return Result.fail(RequiredFieldError({
                    key: 'Ativa'
                }))
            }

            const createDenuncia = await this._denunciaRepository.create({
                Nome: request.Nome.trim(),
                Descricao: request.Descricao.trim(),
                Ativa: request.Ativa
            })

            if (createDenuncia.isFailure) {
                return Result.fail(createDenuncia.error!)
            }

            return Result.ok({
                Denuncia: createDenuncia.getValue()!
            })

        } catch (error) {
            return Result.fail(UnknownError({ error }))
        }
    }
}