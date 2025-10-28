"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DenunciaRepositoryFactory = void 0;
const MSSQLDenunciaRepository_1 = require("./MSSQLDenunciaRepository");
const SQLServerDenunciaRepository_1 = require("./SQLServerDenunciaRepository");
/**
 * Factory para criar a implementação do repositório
 * Pode alternar entre implementação em memória ou SQL Server
 */
class DenunciaRepositoryFactory {
    /**
     * Cria uma instância do repositório baseado na configuração
     * @param useDatabase - Se true, usa SQL Server; se false, usa implementação em memória
     */
    static create(useDatabase = false) {
        if (useDatabase && process.env.NODE_ENV !== 'test') {
            console.log('📊 Usando repositório SQL Server');
            return new SQLServerDenunciaRepository_1.SQLServerDenunciaRepository();
        }
        else {
            console.log('💾 Usando repositório em memória');
            return new MSSQLDenunciaRepository_1.MSSQLDenunciaRepository();
        }
    }
    /**
     * Cria automaticamente baseado nas variáveis de ambiente
     */
    static createFromEnv() {
        const useDatabase = process.env.USE_DATABASE === 'true';
        return this.create(useDatabase);
    }
}
exports.DenunciaRepositoryFactory = DenunciaRepositoryFactory;
//# sourceMappingURL=DenunciaRepositoryFactory.js.map