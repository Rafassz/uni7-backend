import { IDenuncia } from '../../models';
import { IDataBaseError, IResultError, IUnknownError, Result } from '../../../../utils/result';
type RepositoryErrors = IUnknownError | IDataBaseError;
export interface IDenunciaRepository {
    create(denuncia: Omit<IDenuncia, 'IdDenuncia'>): Promise<Result<IDenuncia, IResultError<RepositoryErrors>>>;
    findById(id: number): Promise<Result<IDenuncia | null, IResultError<RepositoryErrors>>>;
    update(id: number, denuncia: Partial<Omit<IDenuncia, 'IdDenuncia'>>): Promise<Result<IDenuncia | null, IResultError<RepositoryErrors>>>;
    delete(id: number): Promise<Result<boolean, IResultError<RepositoryErrors>>>;
}
export {};
