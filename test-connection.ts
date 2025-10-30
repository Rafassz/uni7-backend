import { databaseConnection } from './src/config/database';

async function testConnection() {
    console.log('🧪 Testando conexão com SQL Server...\n');
    
    try {
        // Tentar conectar
        const pool = await databaseConnection.connect();
        console.log('✅ Conexão estabelecida com sucesso!\n');
        
        // Testar query simples
        const result = await pool.request().query('SELECT @@VERSION as Version, DB_NAME() as DatabaseName');
        
        console.log('📊 Informações do servidor:');
        console.log('Versão:', result.recordset[0].Version);
        console.log('Banco atual:', result.recordset[0].DatabaseName);
        console.log('');
        
        // Verificar se a tabela existe
        const tableCheck = await pool.request().query(`
            SELECT COUNT(*) as TableExists 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_NAME = 'Denuncias'
        `);
        
        if (tableCheck.recordset[0].TableExists > 0) {
            console.log('✅ Tabela "Denuncias" encontrada!');
            
            // Contar registros
            const countResult = await pool.request().query('SELECT COUNT(*) as Total FROM Denuncias');
            console.log(`📈 Total de registros: ${countResult.recordset[0].Total}`);
        } else {
            console.log('⚠️  Tabela "Denuncias" não encontrada!');
            console.log('💡 Execute o script SQL para criar a tabela.');
        }
        
    } catch (error) {
        console.error('❌ Erro na conexão:');
        console.error(error);
        console.log('\n💡 Dicas para resolver:');
        console.log('1. Verifique se o SQL Server está rodando');
        console.log('2. Confirme as configurações no arquivo .env');
        console.log('3. Teste a conexão com SSMS primeiro');
    } finally {
        await databaseConnection.close();
        process.exit(0);
    }
}

testConnection();