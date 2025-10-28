"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDenunciaUseCase = void 0;
const result_1 = require("../../../../utils/result");
class UpdateDenunciaUseCase {
    constructor(props) {
        this._denunciaRepository = props.repository.DenunciaRepository;
    }
    // @LogThis('UpdateDenunciaUseCase')
    async execute(request) {
        try {
            if (!request.id || request.id <= 0) {
                return result_1.Result.fail((0, result_1.RequiredFieldError)({
                    key: 'ID da denúncia'
                }));
            }
            // Verificar se há pelo menos um campo para atualizar
            const fieldsToUpdate = {
                ...(request.Nome !== undefined && { Nome: request.Nome.trim() }),
                ...(request.Descricao !== undefined && { Descricao: request.Descricao.trim() }),
                ...(request.Ativa !== undefined && { Ativa: request.Ativa })
            };
            if (Object.keys(fieldsToUpdate).length === 0) {
                return result_1.Result.fail((0, result_1.RequiredFieldError)({
                    key: 'Pelo menos um campo para atualização'
                }));
            }
            // Validações específicas para campos fornecidos
            if (request.Nome !== undefined && (!request.Nome || request.Nome.trim().length === 0)) {
                return result_1.Result.fail((0, result_1.RequiredFieldError)({
                    key: 'Nome'
                }));
            }
            if (request.Descricao !== undefined && (!request.Descricao || request.Descricao.trim().length === 0)) {
                return result_1.Result.fail((0, result_1.RequiredFieldError)({
                    key: 'Descrição'
                }));
            }
            if (request.Ativa !== undefined && typeof request.Ativa !== 'boolean') {
                return result_1.Result.fail((0, result_1.RequiredFieldError)({
                    key: 'Ativa deve ser booleano'
                }));
            }
            const id = Number(request.id);
            const updateDenuncia = await this._denunciaRepository.update(id, fieldsToUpdate);
            if (updateDenuncia.isFailure) {
                return result_1.Result.fail(updateDenuncia.error);
            }
            const updatedDenuncia = updateDenuncia.getValue();
            if (!updatedDenuncia) {
                return result_1.Result.fail((0, result_1.NotFoundError)({
                    key: 'Denúncia'
                }));
            }
            return result_1.Result.ok({
                Denuncia: updatedDenuncia
            });
        }
        catch (error) {
            return result_1.Result.fail((0, result_1.UnknownError)({ error }));
        }
    }
}
exports.UpdateDenunciaUseCase = UpdateDenunciaUseCase;
//# sourceMappingURL=useCase.js.map