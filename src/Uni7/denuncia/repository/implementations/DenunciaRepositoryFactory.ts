import { MSSQLDenunciaRepository } from "./MSSQLDenunciaRepository";
import { SQLServerDenunciaRepository } from "./SQLServerDenunciaRepository";
import { IDenunciaRepository } from "../interfaces";

/**
 * Factory para criar a implementação do repositório
 * Pode alternar entre implementação em memória ou SQL Server
 */
export class DenunciaRepositoryFactory {
    
    /**
     * Cria uma instância do repositório baseado na configuração
     * @param useDatabase - Se true, usa SQL Server; se false, usa implementação em memória
     */
    static create(useDatabase: boolean = false): IDenunciaRepository {
        if (useDatabase && process.env.NODE_ENV !== 'test') {
            console.log('📊 Usando repositório SQL Server');
            return new SQLServerDenunciaRepository();
        } else {
            console.log('💾 Usando repositório em memória');
            return new MSSQLDenunciaRepository();
        }
    }
    
    /**
     * Cria automaticamente baseado nas variáveis de ambiente
     */
    static createFromEnv(): IDenunciaRepository {
        const useDatabase = process.env.USE_DATABASE === 'true';
        return this.create(useDatabase);
    }
}