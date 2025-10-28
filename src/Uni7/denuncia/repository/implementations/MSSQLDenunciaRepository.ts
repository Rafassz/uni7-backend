import { IDenuncia } from '../../models';
import { IDenunciaRepository } from '../interfaces';
import { IDataBaseError, IResultError, IUnknownError, Result, UnknownError } from '../../../../utils/result';

type RepositoryErrors = IUnknownError | IDataBaseError

export class MSSQLDenunciaRepository implements IDenunciaRepository {
    // Simulação de dados em memória para teste
    private denuncias: IDenuncia[] = [
        {
            IdDenuncia: 1,
            Nome: "Denúncia Teste",
            Descricao: "Descrição da denúncia teste",
            Ativa: true
        }
    ];
    
    private nextId = 2;

    async create(denuncia: Omit<IDenuncia, 'IdDenuncia'>): Promise<Result<IDenuncia, IResultError<RepositoryErrors>>> {
        try {
            const newDenuncia: IDenuncia = {
                IdDenuncia: this.nextId++,
                ...denuncia
            };

            this.denuncias.push(newDenuncia);
            
            return Result.ok(newDenuncia);
        } catch (error) {
            return Result.fail(UnknownError({ error }));
        }
    }

    async findById(id: number): Promise<Result<IDenuncia | null, IResultError<RepositoryErrors>>> {
        try {
            const denuncia = this.denuncias.find(d => d.IdDenuncia === id) || null;
            return Result.ok(denuncia);
        } catch (error) {
            return Result.fail(UnknownError({ error }));
        }
    }

    async update(id: number, denuncia: Partial<Omit<IDenuncia, 'IdDenuncia'>>): Promise<Result<IDenuncia | null, IResultError<RepositoryErrors>>> {
        try {
            const index = this.denuncias.findIndex(d => d.IdDenuncia === id);
            
            if (index === -1) {
                return Result.ok(null);
            }

            this.denuncias[index] = {
                ...this.denuncias[index],
                ...denuncia
            };

            return Result.ok(this.denuncias[index]);
        } catch (error) {
            return Result.fail(UnknownError({ error }));
        }
    }

    async delete(id: number): Promise<Result<boolean, IResultError<RepositoryErrors>>> {
        try {
            const index = this.denuncias.findIndex(d => d.IdDenuncia === id);
            
            if (index === -1) {
                return Result.ok(false);
            }

            this.denuncias.splice(index, 1);
            return Result.ok(true);
        } catch (error) {
            return Result.fail(UnknownError({ error }));
        }
    }
}