import { ICreateDenunciaUseCase } from "./useCase"
import { Request, Response } from 'express'

export class CreateDenunciaController {
    
    private readonly _createDenunciaUseCase: ICreateDenunciaUseCase

    constructor(
        props: {
            useCase: {
                createDenunciaUseCase: ICreateDenunciaUseCase
            }
        }
    ) {
        this._createDenunciaUseCase = props.useCase.createDenunciaUseCase
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this._createDenunciaUseCase.execute({
                Nome: request.body.Nome,
                Descricao: request.body.Descricao,
                Ativa: request.body.Ativa
            })

            if (result.isFailure) {
                if (result.error?.type === 'UnknownError') {
                    return response.status(500).json(result.error)
                } else if (result.error?.type === 'RequiredFieldError') {
                    return response.status(400).json(result.error)
                } else if (result.error?.type === 'NotFoundError') {
                    return response.status(404).json(result.error)
                } else if (result.error?.type === 'InvalidFieldError') {
                    return response.status(400).json(result.error)
                } else if (result.error?.type === 'DataBaseError') {
                    return response.status(500).json(result.error)
                } else {
                    return response.status(500).json({
                        message: 'Erro inesperado'
                    })
                }
            } else {
                return response.status(201).json(result.getValue())
            }
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Erro inesperado'
            })
        }
    }
}