"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDenunciaUseCase = void 0;
const result_1 = require("../../../../utils/result");
class CreateDenunciaUseCase {
    constructor(props) {
        this._denunciaRepository = props.repository.DenunciaRepository;
    }
    // @LogThis('CreateDenunciaUseCase')
    async execute(request) {
        try {
            if (!request.Nome) {
                return result_1.Result.fail((0, result_1.RequiredFieldError)({
                    key: 'Nome'
                }));
            }
            if (!request.Descricao) {
                return result_1.Result.fail((0, result_1.RequiredFieldError)({
                    key: 'Descrição'
                }));
            }
            if (typeof request.Ativa !== 'boolean') {
                return result_1.Result.fail((0, result_1.RequiredFieldError)({
                    key: 'Ativa'
                }));
            }
            const createDenuncia = await this._denunciaRepository.create({
                Nome: request.Nome.trim(),
                Descricao: request.Descricao.trim(),
                Ativa: request.Ativa
            });
            if (createDenuncia.isFailure) {
                return result_1.Result.fail(createDenuncia.error);
            }
            return result_1.Result.ok({
                Denuncia: createDenuncia.getValue()
            });
        }
        catch (error) {
            return result_1.Result.fail((0, result_1.UnknownError)({ error }));
        }
    }
}
exports.CreateDenunciaUseCase = CreateDenunciaUseCase;
//# sourceMappingURL=useCase.js.map