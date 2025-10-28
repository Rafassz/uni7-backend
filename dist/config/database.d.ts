import { ConnectionPool } from 'mssql';
export interface DatabaseConfig {
    server: string;
    database: string;
    user: string;
    password: string;
    port: number;
    pool: {
        max: number;
        min: number;
        idleTimeoutMillis: number;
    };
    options: {
        encrypt: boolean;
        trustServerCertificate: boolean;
        enableArithAbort: boolean;
    };
}
export declare const databaseConfig: DatabaseConfig;
declare class DatabaseConnection {
    private pool;
    private connecting;
    connect(): Promise<ConnectionPool>;
    close(): Promise<void>;
    getPool(): ConnectionPool | null;
}
export declare const databaseConnection: DatabaseConnection;
export {};
