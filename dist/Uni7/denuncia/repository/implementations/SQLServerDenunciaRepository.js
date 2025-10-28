"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLServerDenunciaRepository = void 0;
const mssql_1 = require("mssql");
const result_1 = require("../../../../utils/result");
const database_1 = require("../../../../config/database");
class SQLServerDenunciaRepository {
    async getConnection() {
        return await database_1.databaseConnection.connect();
    }
    async create(denuncia) {
        try {
            const pool = await this.getConnection();
            const request = new mssql_1.Request(pool);
            // Parâmetros para evitar SQL Injection
            request.input('Nome', mssql_1.TYPES.VarChar(255), denuncia.Nome);
            request.input('Descricao', mssql_1.TYPES.VarChar(255), denuncia.Descricao);
            request.input('Ativa', mssql_1.TYPES.Bit, denuncia.Ativa);
            const query = `
                INSERT INTO Denuncia (Nome, Descricao, Ativa)
                OUTPUT INSERTED.IdDenuncia, INSERTED.Nome, INSERTED.Descricao, INSERTED.Ativa
                VALUES (@Nome, @Descricao, @Ativa)
            `;
            const result = await request.query(query);
            if (result.recordset && result.recordset.length > 0) {
                const record = result.recordset[0];
                const newDenuncia = {
                    IdDenuncia: record.IdDenuncia,
                    Nome: record.Nome,
                    Descricao: record.Descricao,
                    Ativa: record.Ativa
                };
                return result_1.Result.ok(newDenuncia);
            }
            else {
                return result_1.Result.fail((0, result_1.DataBaseError)({
                    error: 'Falha ao criar denúncia - nenhum registro retornado'
                }));
            }
        }
        catch (error) {
            console.error('Erro ao criar denúncia:', error);
            return result_1.Result.fail((0, result_1.DataBaseError)({
                error: error.message || 'Erro no banco de dados ao criar denúncia'
            }));
        }
    }
    async findById(id) {
        try {
            const pool = await this.getConnection();
            const request = new mssql_1.Request(pool);
            request.input('IdDenuncia', mssql_1.TYPES.Int, id);
            const query = `
                SELECT IdDenuncia, Nome, Descricao, Ativa
                FROM Denuncia
                WHERE IdDenuncia = @IdDenuncia
            `;
            const result = await request.query(query);
            if (result.recordset && result.recordset.length > 0) {
                const record = result.recordset[0];
                const denuncia = {
                    IdDenuncia: record.IdDenuncia,
                    Nome: record.Nome,
                    Descricao: record.Descricao,
                    Ativa: record.Ativa
                };
                return result_1.Result.ok(denuncia);
            }
            else {
                return result_1.Result.ok(null);
            }
        }
        catch (error) {
            console.error('Erro ao buscar denúncia:', error);
            return result_1.Result.fail((0, result_1.DataBaseError)({
                error: error.message || 'Erro no banco de dados ao buscar denúncia'
            }));
        }
    }
    async update(id, denuncia) {
        try {
            const pool = await this.getConnection();
            const request = new mssql_1.Request(pool);
            // Construir query dinamicamente baseada nos campos fornecidos
            const updateFields = [];
            const parameters = {};
            if (denuncia.Nome !== undefined) {
                updateFields.push('Nome = @Nome');
                request.input('Nome', mssql_1.TYPES.VarChar(255), denuncia.Nome);
            }
            if (denuncia.Descricao !== undefined) {
                updateFields.push('Descricao = @Descricao');
                request.input('Descricao', mssql_1.TYPES.VarChar(255), denuncia.Descricao);
            }
            if (denuncia.Ativa !== undefined) {
                updateFields.push('Ativa = @Ativa');
                request.input('Ativa', mssql_1.TYPES.Bit, denuncia.Ativa);
            }
            if (updateFields.length === 0) {
                return result_1.Result.fail((0, result_1.DataBaseError)({
                    error: 'Nenhum campo fornecido para atualização'
                }));
            }
            request.input('IdDenuncia', mssql_1.TYPES.Int, id);
            const query = `
                UPDATE Denuncia 
                SET ${updateFields.join(', ')}
                OUTPUT INSERTED.IdDenuncia, INSERTED.Nome, INSERTED.Descricao, INSERTED.Ativa
                WHERE IdDenuncia = @IdDenuncia
            `;
            const result = await request.query(query);
            if (result.recordset && result.recordset.length > 0) {
                const record = result.recordset[0];
                const updatedDenuncia = {
                    IdDenuncia: record.IdDenuncia,
                    Nome: record.Nome,
                    Descricao: record.Descricao,
                    Ativa: record.Ativa
                };
                return result_1.Result.ok(updatedDenuncia);
            }
            else {
                return result_1.Result.ok(null); // Registro não encontrado
            }
        }
        catch (error) {
            console.error('Erro ao atualizar denúncia:', error);
            return result_1.Result.fail((0, result_1.DataBaseError)({
                error: error.message || 'Erro no banco de dados ao atualizar denúncia'
            }));
        }
    }
    async delete(id) {
        try {
            const pool = await this.getConnection();
            const request = new mssql_1.Request(pool);
            request.input('IdDenuncia', mssql_1.TYPES.Int, id);
            const query = `
                DELETE FROM Denuncia
                WHERE IdDenuncia = @IdDenuncia
            `;
            const result = await request.query(query);
            // Verifica se algum registro foi afetado
            const wasDeleted = result.rowsAffected && result.rowsAffected[0] > 0;
            return result_1.Result.ok(!!wasDeleted);
        }
        catch (error) {
            console.error('Erro ao deletar denúncia:', error);
            return result_1.Result.fail((0, result_1.DataBaseError)({
                error: error.message || 'Erro no banco de dados ao deletar denúncia'
            }));
        }
    }
}
exports.SQLServerDenunciaRepository = SQLServerDenunciaRepository;
//# sourceMappingURL=SQLServerDenunciaRepository.js.map