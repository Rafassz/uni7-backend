"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSSQLDenunciaRepository = void 0;
const result_1 = require("../../../../utils/result");
class MSSQLDenunciaRepository {
    constructor() {
        // Simulação de dados em memória para teste
        this.denuncias = [
            {
                IdDenuncia: 1,
                Nome: "Denúncia Teste",
                Descricao: "Descrição da denúncia teste",
                Ativa: true
            }
        ];
        this.nextId = 2;
    }
    async create(denuncia) {
        try {
            const newDenuncia = {
                IdDenuncia: this.nextId++,
                ...denuncia
            };
            this.denuncias.push(newDenuncia);
            return result_1.Result.ok(newDenuncia);
        }
        catch (error) {
            return result_1.Result.fail((0, result_1.UnknownError)({ error }));
        }
    }
    async findById(id) {
        try {
            const denuncia = this.denuncias.find(d => d.IdDenuncia === id) || null;
            return result_1.Result.ok(denuncia);
        }
        catch (error) {
            return result_1.Result.fail((0, result_1.UnknownError)({ error }));
        }
    }
    async update(id, denuncia) {
        try {
            const index = this.denuncias.findIndex(d => d.IdDenuncia === id);
            if (index === -1) {
                return result_1.Result.ok(null);
            }
            this.denuncias[index] = {
                ...this.denuncias[index],
                ...denuncia
            };
            return result_1.Result.ok(this.denuncias[index]);
        }
        catch (error) {
            return result_1.Result.fail((0, result_1.UnknownError)({ error }));
        }
    }
    async delete(id) {
        try {
            const index = this.denuncias.findIndex(d => d.IdDenuncia === id);
            if (index === -1) {
                return result_1.Result.ok(false);
            }
            this.denuncias.splice(index, 1);
            return result_1.Result.ok(true);
        }
        catch (error) {
            return result_1.Result.fail((0, result_1.UnknownError)({ error }));
        }
    }
}
exports.MSSQLDenunciaRepository = MSSQLDenunciaRepository;
//# sourceMappingURL=MSSQLDenunciaRepository.js.map