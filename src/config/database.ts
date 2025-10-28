import { ConnectionPool, config as SqlConfig } from 'mssql';

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

export const databaseConfig: DatabaseConfig = {
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
  private pool: ConnectionPool | null = null;
  private connecting = false;

  async connect(): Promise<ConnectionPool> {
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
      
      const config: SqlConfig = {
        server: databaseConfig.server,
        database: databaseConfig.database,
        user: databaseConfig.user,
        password: databaseConfig.password,
        port: databaseConfig.port,
        pool: databaseConfig.pool,
        options: databaseConfig.options,
      };

      this.pool = new ConnectionPool(config);
      
      await this.pool.connect();
      
      console.log('✅ Conectado ao SQL Server com sucesso!');
      
      this.pool.on('error', (err) => {
        console.error('❌ Erro na conexão com SQL Server:', err);
      });

      return this.pool;
    } catch (error) {
      console.error('❌ Falha ao conectar com SQL Server:', error);
      throw error;
    } finally {
      this.connecting = false;
    }
  }

  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
      console.log('🔌 Conexão com SQL Server fechada');
    }
  }

  getPool(): ConnectionPool | null {
    return this.pool;
  }
}

export const databaseConnection = new DatabaseConnection();