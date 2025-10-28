import { IDataBaseError, IInvalidFieldError, INotFoundError, IRequiredFieldError, IResultError, IUnknownError, RequiredFieldError, NotFoundError, Result, UnknownError } from "../../../../utils/result";
import { IDenunciaRepository } from '../../repository';
import { IRequest, IResponse } from './DTO';

type Errors = IUnknownError | IRequiredFieldError | INotFoundError | IInvalidFieldError | IDataBaseError

export interface IUpdateDenunciaUseCase {
    execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>>
}

export class UpdateDenunciaUseCase implements IUpdateDenunciaUseCase {
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

    // @LogThis('UpdateDenunciaUseCase')
    async execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>> {
        try {
            if (!request.id || request.id <= 0) {
                return Result.fail(RequiredFieldError({
                    key: 'ID da denúncia'
                }))
            }

            // Verificar se há pelo menos um campo para atualizar
            const fieldsToUpdate = {
                ...(request.Nome !== undefined && { Nome: request.Nome.trim() }),
                ...(request.Descricao !== undefined && { Descricao: request.Descricao.trim() }),
                ...(request.Ativa !== undefined && { Ativa: request.Ativa })
            };

            if (Object.keys(fieldsToUpdate).length === 0) {
                return Result.fail(RequiredFieldError({
                    key: 'Pelo menos um campo para atualização'
                }))
            }

            // Validações específicas para campos fornecidos
            if (request.Nome !== undefined && (!request.Nome || request.Nome.trim().length === 0)) {
                return Result.fail(RequiredFieldError({
                    key: 'Nome'
                }))
            }

            if (request.Descricao !== undefined && (!request.Descricao || request.Descricao.trim().length === 0)) {
                return Result.fail(RequiredFieldError({
                    key: 'Descrição'
                }))
            }

            if (request.Ativa !== undefined && typeof request.Ativa !== 'boolean') {
                return Result.fail(RequiredFieldError({
                    key: 'Ativa deve ser booleano'
                }))
            }

            const id = Number(request.id)

            const updateDenuncia = await this._denunciaRepository.update(id, fieldsToUpdate)

            if (updateDenuncia.isFailure) {
                return Result.fail(updateDenuncia.error!)
            }

            const updatedDenuncia = updateDenuncia.getValue()!

            if (!updatedDenuncia) {
                return Result.fail(NotFoundError({
                    key: 'Denúncia'
                }))
            }

            return Result.ok({
                Denuncia: updatedDenuncia
            })

        } catch (error) {
            return Result.fail(UnknownError({ error }))
        }
    }
}