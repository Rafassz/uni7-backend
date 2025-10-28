import { ConnectionPool, Request, TYPES } from 'mssql';
import { IDenuncia } from '../../models';
import { IDenunciaRepository } from '../interfaces';
import { IDataBaseError, IResultError, IUnknownError, Result, UnknownError, DataBaseError } from '../../../../utils/result';
import { databaseConnection } from '../../../../config/database';

type RepositoryErrors = IUnknownError | IDataBaseError

export class SQLServerDenunciaRepository implements IDenunciaRepository {
    
    private async getConnection(): Promise<ConnectionPool> {
        return await databaseConnection.connect();
    }

    async create(denuncia: Omit<IDenuncia, 'IdDenuncia'>): Promise<Result<IDenuncia, IResultError<RepositoryErrors>>> {
        try {
            const pool = await this.getConnection();
            const request = new Request(pool);

            // Parâmetros para evitar SQL Injection
            request.input('Nome', TYPES.VarChar(255), denuncia.Nome);
            request.input('Descricao', TYPES.VarChar(255), denuncia.Descricao);
            request.input('Ativa', TYPES.Bit, denuncia.Ativa);

            const query = `
                INSERT INTO Denuncia (Nome, Descricao, Ativa)
                OUTPUT INSERTED.IdDenuncia, INSERTED.Nome, INSERTED.Descricao, INSERTED.Ativa
                VALUES (@Nome, @Descricao, @Ativa)
            `;

            const result = await request.query(query);
            
            if (result.recordset && result.recordset.length > 0) {
                const record = result.recordset[0];
                const newDenuncia: IDenuncia = {
                    IdDenuncia: record.IdDenuncia,
                    Nome: record.Nome,
                    Descricao: record.Descricao,
                    Ativa: record.Ativa
                };
                
                return Result.ok(newDenuncia);
            } else {
                return Result.fail(DataBaseError({
                    error: 'Falha ao criar denúncia - nenhum registro retornado'
                }));
            }

        } catch (error: any) {
            console.error('Erro ao criar denúncia:', error);
            return Result.fail(DataBaseError({
                error: error.message || 'Erro no banco de dados ao criar denúncia'
            }));
        }
    }

    async findById(id: number): Promise<Result<IDenuncia | null, IResultError<RepositoryErrors>>> {
        try {
            const pool = await this.getConnection();
            const request = new Request(pool);

            request.input('IdDenuncia', TYPES.Int, id);

            const query = `
                SELECT IdDenuncia, Nome, Descricao, Ativa
                FROM Denuncia
                WHERE IdDenuncia = @IdDenuncia
            `;

            const result = await request.query(query);
            
            if (result.recordset && result.recordset.length > 0) {
                const record = result.recordset[0];
                const denuncia: IDenuncia = {
                    IdDenuncia: record.IdDenuncia,
                    Nome: record.Nome,
                    Descricao: record.Descricao,
                    Ativa: record.Ativa
                };
                
                return Result.ok(denuncia);
            } else {
                return Result.ok(null);
            }

        } catch (error: any) {
            console.error('Erro ao buscar denúncia:', error);
            return Result.fail(DataBaseError({
                error: error.message || 'Erro no banco de dados ao buscar denúncia'
            }));
        }
    }

    async update(id: number, denuncia: Partial<Omit<IDenuncia, 'IdDenuncia'>>): Promise<Result<IDenuncia | null, IResultError<RepositoryErrors>>> {
        try {
            const pool = await this.getConnection();
            const request = new Request(pool);

            // Construir query dinamicamente baseada nos campos fornecidos
            const updateFields: string[] = [];
            const parameters: any = {};

            if (denuncia.Nome !== undefined) {
                updateFields.push('Nome = @Nome');
                request.input('Nome', TYPES.VarChar(255), denuncia.Nome);
            }

            if (denuncia.Descricao !== undefined) {
                updateFields.push('Descricao = @Descricao');
                request.input('Descricao', TYPES.VarChar(255), denuncia.Descricao);
            }

            if (denuncia.Ativa !== undefined) {
                updateFields.push('Ativa = @Ativa');
                request.input('Ativa', TYPES.Bit, denuncia.Ativa);
            }

            if (updateFields.length === 0) {
                return Result.fail(DataBaseError({
                    error: 'Nenhum campo fornecido para atualização'
                }));
            }

            request.input('IdDenuncia', TYPES.Int, id);

            const query = `
                UPDATE Denuncia 
                SET ${updateFields.join(', ')}
                OUTPUT INSERTED.IdDenuncia, INSERTED.Nome, INSERTED.Descricao, INSERTED.Ativa
                WHERE IdDenuncia = @IdDenuncia
            `;

            const result = await request.query(query);
            
            if (result.recordset && result.recordset.length > 0) {
                const record = result.recordset[0];
                const updatedDenuncia: IDenuncia = {
                    IdDenuncia: record.IdDenuncia,
                    Nome: record.Nome,
                    Descricao: record.Descricao,
                    Ativa: record.Ativa
                };
                
                return Result.ok(updatedDenuncia);
            } else {
                return Result.ok(null); // Registro não encontrado
            }

        } catch (error: any) {
            console.error('Erro ao atualizar denúncia:', error);
            return Result.fail(DataBaseError({
                error: error.message || 'Erro no banco de dados ao atualizar denúncia'
            }));
        }
    }

    async delete(id: number): Promise<Result<boolean, IResultError<RepositoryErrors>>> {
        try {
            const pool = await this.getConnection();
            const request = new Request(pool);

            request.input('IdDenuncia', TYPES.Int, id);

            const query = `
                DELETE FROM Denuncia
                WHERE IdDenuncia = @IdDenuncia
            `;

            const result = await request.query(query);
            
            // Verifica se algum registro foi afetado
            const wasDeleted = result.rowsAffected && result.rowsAffected[0] > 0;
            
            return Result.ok(!!wasDeleted);

        } catch (error: any) {
            console.error('Erro ao deletar denúncia:', error);
            return Result.fail(DataBaseError({
                error: error.message || 'Erro no banco de dados ao deletar denúncia'
            }));
        }
    }
}