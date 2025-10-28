"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = require("./Uni7/routes");
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rotas
app.use('/api', (0, routes_1.createAppRouter)());
// Rota de saúde
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API Denúncia funcionando',
        timestamp: new Date().toISOString()
    });
});
// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
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
        await database_1.databaseConnection.connect();
        console.log('🗄️  Banco de dados conectado com sucesso');
    }
    catch (error) {
        console.error('❌ Falha ao conectar com o banco de dados:', error);
        console.log('⚠️  Servidor rodando sem conexão com banco (usando dados em memória)');
    }
});
exports.default = app;
//# sourceMappingURL=index.js.map