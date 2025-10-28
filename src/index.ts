import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createAppRouter } from './Uni7/routes';
import { databaseConnection } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', createAppRouter());

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API Denúncia funcionando',
    timestamp: new Date().toISOString()
  });
});

// Middleware de tratamento de erros global
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Erro não tratado:', err);
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Erro interno do servidor' 
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 API Base: http://localhost:${PORT}/api`);
  console.log(`🔥 Denúncias: http://localhost:${PORT}/api/denuncias`);
  
  // Tentar conectar ao banco de dados
  try {
    await databaseConnection.connect();
    console.log('🗄️  Banco de dados conectado com sucesso');
  } catch (error) {
    console.error('❌ Falha ao conectar com o banco de dados:', error);
    console.log('⚠️  Servidor rodando sem conexão com banco (usando dados em memória)');
  }
});

export default app;