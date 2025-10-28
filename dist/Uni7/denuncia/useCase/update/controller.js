"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDenunciaController = void 0;
class UpdateDenunciaController {
    constructor(props) {
        this._updateDenunciaUseCase = props.useCase.updateDenunciaUseCase;
    }
    async handle(request, response) {
        try {
            const id = parseInt(request.params.id, 10);
            const { Nome, Descricao, Ativa } = request.body;
            const updateData = {
                id,
                ...(Nome !== undefined && { Nome }),
                ...(Descricao !== undefined && { Descricao }),
                ...(Ativa !== undefined && { Ativa })
            };
            const result = await this._updateDenunciaUseCase.execute(updateData);
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
                return response.status(200).json(result.getValue());
            }
        }
        catch (error) {
            return response.status(400).json({
                message: error.message || 'Erro inesperado'
            });
        }
    }
}
exports.UpdateDenunciaController = UpdateDenunciaController;
//# sourceMappingURL=controller.js.map