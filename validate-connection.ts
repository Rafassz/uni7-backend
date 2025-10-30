import { databaseConnection, databaseConfig } from './src/config/database';

async function validateConnection() {
    console.log('🔍 VALIDAÇÃO DE CONEXÃO SQL SERVER');
    console.log('=====================================\n');
    
    // 1. Validar configurações do .env
    console.log('📋 1. VERIFICANDO CONFIGURAÇÕES:');
    console.log(`   Servidor: ${databaseConfig.server}`);
    console.log(`   Banco: ${databaseConfig.database}`);
    console.log(`   Usuário: ${databaseConfig.user || 'Windows Auth'}`);
    console.log(`   Senha: ${databaseConfig.password ? '***' : 'Não definida'}`);
    console.log(`   Porta: ${databaseConfig.port}`);
    console.log('');

    // 2. Verificar se está usando autenticação correta
    const useWindowsAuth = !databaseConfig.user || !databaseConfig.password || databaseConfig.password === 'your_password_here';
    console.log('🔑 2. TIPO DE AUTENTICAÇÃO:');
    if (useWindowsAuth) {
        console.log('   ✅ Windows Authentication (Integrated Security)');
        console.log('   💡 Recomendado para LocalDB: (localdb)\\MSSQLLocalDB');
    } else {
        console.log('   ✅ SQL Server Authentication');
        console.log('   💡 Certifique-se de que o usuário SA está habilitado');
    }
    console.log('');

    // 3. Tentar conectar
    console.log('🌐 3. TESTANDO CONEXÃO:');
    try {
        const pool = await databaseConnection.connect();
        console.log('   ✅ Conexão estabelecida com sucesso!\n');
        
        // 4. Testar query básica
        console.log('📊 4. TESTANDO QUERIES:');
        try {
            const result = await pool.request().query('SELECT @@VERSION as Version, @@SERVERNAME as ServerName, DB_NAME() as DatabaseName');
            console.log('   ✅ Query básica executada com sucesso!');
            console.log(`   Servidor: ${result.recordset[0].ServerName}`);
            console.log(`   Banco atual: ${result.recordset[0].DatabaseName}`);
            console.log('');
        } catch (queryError) {
            console.log('   ❌ Erro ao executar query básica:');
            console.log(`   ${queryError}`);
            console.log('');
        }
        
        // 5. Verificar se a tabela Denuncias existe
        console.log('🗃️  5. VERIFICANDO ESTRUTURA DO BANCO:');
        try {
            const tableCheck = await pool.request().query(`
                SELECT COUNT(*) as TableExists 
                FROM INFORMATION_SCHEMA.TABLES 
                WHERE TABLE_NAME = 'Denuncias'
            `);
            
            if (tableCheck.recordset[0].TableExists > 0) {
                console.log('   ✅ Tabela "Denuncias" encontrada!');
                
                // Contar registros
                const countResult = await pool.request().query('SELECT COUNT(*) as Total FROM Denuncias');
                console.log(`   📈 Total de registros: ${countResult.recordset[0].Total}`);
            } else {
                console.log('   ⚠️  Tabela "Denuncias" NÃO encontrada!');
                console.log('   💡 Você precisa executar o script de criação da tabela.');
                console.log('');
                console.log('   📝 Script para criar a tabela:');
                console.log('   CREATE TABLE Denuncias (');
                console.log('       IdDenuncia INT IDENTITY(1,1) PRIMARY KEY,');
                console.log('       Nome NVARCHAR(255) NOT NULL,');
                console.log('       Descricao NVARCHAR(MAX) NOT NULL,');
                console.log('       Ativa BIT NOT NULL DEFAULT 1,');
                console.log('       DataCriacao DATETIME2 DEFAULT GETDATE(),');
                console.log('       DataAtualizacao DATETIME2 DEFAULT GETDATE()');
                console.log('   );');
            }
        } catch (tableError: any) {
            console.log('   ❌ Erro ao verificar tabela:');
            console.log(`   ${tableError}`);
            
            if (tableError.message?.includes('Invalid object name')) {
                console.log('   💡 O banco "DenunciaDB" pode não existir ou a tabela não foi criada.');
            }
        }
        
        console.log('\n✅ VALIDAÇÃO CONCLUÍDA - CONEXÃO OK!');
        
    } catch (error: any) {
        console.log('   ❌ FALHA NA CONEXÃO:');
        console.log(`   ${error}\n`);
        
        console.log('🔧 POSSÍVEIS SOLUÇÕES:');
        
        if (error.message?.includes('Login failed')) {
            console.log('   1. Problema de autenticação:');
            console.log('      - Verifique usuário e senha no .env');
            console.log('      - Certifique-se que o usuário SA está habilitado');
            console.log('      - Ou use Windows Auth deixando user/password vazios');
        }
        
        if (error.message?.includes('server was not found')) {
            console.log('   2. Servidor não encontrado:');
            console.log('      - Verifique se o SQL Server está rodando');
            console.log('      - Confirme o nome da instância (SQLEXPRESS, MSSQLSERVER, etc.)');
            console.log('      - Para LocalDB use: (localdb)\\MSSQLLocalDB');
        }
        
        if (error.message?.includes('Database') && error.message?.includes('cannot be opened')) {
            console.log('   3. Banco não existe:');
            console.log('      - Crie o banco "DenunciaDB" no SQL Server');
            console.log('      - Comando: CREATE DATABASE DenunciaDB;');
        }
        
        console.log('\n   💡 Para debugging:');
        console.log('   - Teste a conexão no SQL Server Management Studio primeiro');
        console.log('   - Verifique os serviços do Windows (services.msc)');
        console.log('   - Confirme que TCP/IP está habilitado');
    } finally {
        await databaseConnection.close();
        process.exit(0);
    }
}

validateConnection();