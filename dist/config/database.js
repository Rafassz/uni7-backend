"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnection = exports.databaseConfig = void 0;
const mssql_1 = require("mssql");
exports.databaseConfig = {
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE || 'DenunciaDB',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'your_password',
    port: parseInt(process.env.DB_PORT || '1433'),
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: process.env.NODE_ENV === 'production', // true para Azure
        trustServerCertificate: true, // true para desenvolvimento local
        enableArithAbort: true,
    },
};
class DatabaseConnection {
    constructor() {
        this.pool = null;
        this.connecting = false;
    }
    async connect() {
        if (this.pool && this.pool.connected) {
            return this.pool;
        }
        if (this.connecting) {
            // Aguarda a conexão atual terminar
            while (this.connecting) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            if (this.pool && this.pool.connected) {
                return this.pool;
            }
        }
        try {
            this.connecting = true;
            const config = {
                server: exports.databaseConfig.server,
                database: exports.databaseConfig.database,
                user: exports.databaseConfig.user,
                password: exports.databaseConfig.password,
                port: exports.databaseConfig.port,
                pool: exports.databaseConfig.pool,
                options: exports.databaseConfig.options,
            };
            this.pool = new mssql_1.ConnectionPool(config);
            await this.pool.connect();
            console.log('✅ Conectado ao SQL Server com sucesso!');
            this.pool.on('error', (err) => {
                console.error('❌ Erro na conexão com SQL Server:', err);
            });
            return this.pool;
        }
        catch (error) {
            console.error('❌ Falha ao conectar com SQL Server:', error);
            throw error;
        }
        finally {
            this.connecting = false;
        }
    }
    async close() {
        if (this.pool) {
            await this.pool.close();
            this.pool = null;
            console.log('🔌 Conexão com SQL Server fechada');
        }
    }
    getPool() {
        return this.pool;
    }
}
exports.databaseConnection = new DatabaseConnection();
//# sourceMappingURL=database.js.map