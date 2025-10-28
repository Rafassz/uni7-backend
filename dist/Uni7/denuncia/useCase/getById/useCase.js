"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdDenunciaUseCase = void 0;
const result_1 = require("../../../../utils/result");
class GetByIdDenunciaUseCase {
    constructor(props) {
        this._denunciaRepository = props.repository.DenunciaRepository;
    }
    // @LogThis('GetByIdDenunciaUseCase')
    async execute(request) {
        try {
            if (!request.id || request.id <= 0) {
                return result_1.Result.fail((0, result_1.RequiredFieldError)({
                    key: 'ID da denúncia'
                }));
            }
            const id = Number(request.id);
            const findDenuncia = await this._denunciaRepository.findById(id);
            if (findDenuncia.isFailure) {
                return result_1.Result.fail(findDenuncia.error);
            }
            const denuncia = findDenuncia.getValue();
            if (!denuncia) {
                return result_1.Result.fail((0, result_1.NotFoundError)({
                    key: 'Denúncia'
                }));
            }
            return result_1.Result.ok({
                Denuncia: denuncia
            });
        }
        catch (error) {
            return result_1.Result.fail((0, result_1.UnknownError)({ error }));
        }
    }
}
exports.GetByIdDenunciaUseCase = GetByIdDenunciaUseCase;
//# sourceMappingURL=useCase.js.map