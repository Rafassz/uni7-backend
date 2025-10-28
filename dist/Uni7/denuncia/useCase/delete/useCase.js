"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDenunciaUseCase = void 0;
const result_1 = require("../../../../utils/result");
class DeleteDenunciaUseCase {
    constructor(props) {
        this._denunciaRepository = props.repository.DenunciaRepository;
    }
    // @LogThis('DeleteDenunciaUseCase')
    async execute(request) {
        try {
            if (!request.id || request.id <= 0) {
                return result_1.Result.fail((0, result_1.RequiredFieldError)({
                    key: 'ID da denúncia'
                }));
            }
            const id = Number(request.id);
            // Verificar se a denúncia existe antes de tentar deletar
            const findDenuncia = await this._denunciaRepository.findById(id);
            if (findDenuncia.isFailure) {
                return result_1.Result.fail(findDenuncia.error);
            }
            const existingDenuncia = findDenuncia.getValue();
            if (!existingDenuncia) {
                return result_1.Result.fail((0, result_1.NotFoundError)({
                    key: 'Denúncia'
                }));
            }
            const deleteDenuncia = await this._denunciaRepository.delete(id);
            if (deleteDenuncia.isFailure) {
                return result_1.Result.fail(deleteDenuncia.error);
            }
            const deleted = deleteDenuncia.getValue();
            if (!deleted) {
                return result_1.Result.fail((0, result_1.UnknownError)({
                    error: 'Falha ao deletar denúncia'
                }));
            }
            return result_1.Result.ok({
                success: true
            });
        }
        catch (error) {
            return result_1.Result.fail((0, result_1.UnknownError)({ error }));
        }
    }
}
exports.DeleteDenunciaUseCase = DeleteDenunciaUseCase;
//# sourceMappingURL=useCase.js.map