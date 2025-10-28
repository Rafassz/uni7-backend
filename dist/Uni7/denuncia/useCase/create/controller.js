"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDenunciaController = void 0;
class CreateDenunciaController {
    constructor(props) {
        this._createDenunciaUseCase = props.useCase.createDenunciaUseCase;
    }
    async handle(request, response) {
        try {
            const result = await this._createDenunciaUseCase.execute({
                Nome: request.body.Nome,
                Descricao: request.body.Descricao,
                Ativa: request.body.Ativa
            });
            if (result.isFailure) {
                if (result.error?.type === 'UnknownError') {
                    return response.status(500).json(result.error);
                }
                else if (result.error?.type === 'RequiredFieldError') {
                    return response.status(400).json(result.error);
                }
                else if (result.error?.type === 'NotFoundError') {
                    return response.status(404).json(result.error);
                }
                else if (result.error?.type === 'InvalidFieldError') {
                    return response.status(400).json(result.error);
                }
                else if (result.error?.type === 'DataBaseError') {
                    return response.status(500).json(result.error);
                }
                else {
                    return response.status(500).json({
                        message: 'Erro inesperado'
                    });
                }
            }
            else {
                return response.status(201).json(result.getValue());
            }
        }
        catch (error) {
            return response.status(400).json({
                message: error.message || 'Erro inesperado'
            });
        }
    }
}
exports.CreateDenunciaController = CreateDenunciaController;
//# sourceMappingURL=controller.js.map