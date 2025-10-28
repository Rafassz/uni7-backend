import { IDeleteDenunciaUseCase } from "./useCase"
import { Request, Response } from 'express'

export class DeleteDenunciaController {
    
    private readonly _deleteDenunciaUseCase: IDeleteDenunciaUseCase

    constructor(
        props: {
            useCase: {
                deleteDenunciaUseCase: IDeleteDenunciaUseCase
            }
        }
    ) {
        this._deleteDenunciaUseCase = props.useCase.deleteDenunciaUseCase
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const id = parseInt(request.params.id, 10);

            const result = await this._deleteDenunciaUseCase.execute({ id })

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
                return response.status(200).json(result.getValue())
            }
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Erro inesperado'
            })
        }
    }
}