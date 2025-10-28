import { IDenuncia } from '../../models';
import { IDenunciaRepository } from '../interfaces';
import { IDataBaseError, IResultError, IUnknownError, Result } from '../../../../utils/result';
type RepositoryErrors = IUnknownError | IDataBaseError;
export declare class SQLServerDenunciaRepository implements IDenunciaRepository {
    private getConnection;
    create(denuncia: Omit<IDenuncia, 'IdDenuncia'>): Promise<Result<IDenuncia, IResultError<RepositoryErrors>>>;
    findById(id: number): Promise<Result<IDenuncia | null, IResultError<RepositoryErrors>>>;
    update(id: number, denuncia: Partial<Omit<IDenuncia, 'IdDenuncia'>>): Promise<Result<IDenuncia | null, IResultError<RepositoryErrors>>>;
    delete(id: number): Promise<Result<boolean, IResultError<RepositoryErrors>>>;
}
export {};
