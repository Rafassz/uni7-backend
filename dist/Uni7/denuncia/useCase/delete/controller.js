"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDenunciaController = void 0;
class DeleteDenunciaController {
    constructor(props) {
        this._deleteDenunciaUseCase = props.useCase.deleteDenunciaUseCase;
    }
    async handle(request, response) {
        try {
            const id = parseInt(request.params.id, 10);
            const result = await this._deleteDenunciaUseCase.execute({ id });
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
exports.DeleteDenunciaController = DeleteDenunciaController;
//# sourceMappingURL=controller.js.map