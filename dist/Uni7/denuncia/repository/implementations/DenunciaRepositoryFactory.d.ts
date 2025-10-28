import { IDenunciaRepository } from "../interfaces";
/**
 * Factory para criar a implementação do repositório
 * Pode alternar entre implementação em memória ou SQL Server
 */
export declare class DenunciaRepositoryFactory {
    /**
     * Cria uma instância do repositório baseado na configuração
     * @param useDatabase - Se true, usa SQL Server; se false, usa implementação em memória
     */
    static create(useDatabase?: boolean): IDenunciaRepository;
    /**
     * Cria automaticamente baseado nas variáveis de ambiente
     */
    static createFromEnv(): IDenunciaRepository;
}
