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
  server: process.env.DB_SERVER || 'localhost\\SQLEXPRESS',
  database: process.env.DB_DATABASE || 'DenunciaDB',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '1433'),
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || '10'),
    min: parseInt(process.env.DB_POOL_MIN || '2'),
    idleTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000'),
  },
  options: {
    encrypt: process.env.NODE_ENV === 'production', // false para desenvolvimento local
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
        port: databaseConfig.port,
        pool: databaseConfig.pool,
        options: databaseConfig.options,
      };

      // Configurar autenticação: Windows Auth ou SQL Auth
      if (databaseConfig.user && databaseConfig.password && databaseConfig.password !== 'your_password_here') {
        // SQL Server Authentication
        config.user = databaseConfig.user;
        config.password = databaseConfig.password;
        console.log('🔑 Usando autenticação SQL Server');
        console.log(`👤 Usuário: ${databaseConfig.user}`);
      } else {
        // Windows Authentication (Integrated Security)
        config.authentication = {
          type: 'ntlm',
          options: {
            domain: '',
            userName: '',
            password: ''
          }
        };
        console.log('🔑 Usando autenticação Windows (Integrated Security)');
      }

      console.log(`🔗 Conectando ao servidor: ${databaseConfig.server}`);
      console.log(`📊 Banco de dados: ${databaseConfig.database}`);

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