# Sistema de Denúncias - Backend

Sistema backend em TypeScript com Express.js e SQL Server para gerenciamento de denúncias.

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas bem definida:

- **Controllers**: Responsáveis por receber as requisições HTTP
- **Use Cases**: Contêm a lógica de negócio
- **Repositories**: Interface para acesso aos dados
- **Models**: Definição das entidades

## 🚀 Como executar

### Instalação das dependências
```bash
npm install
```

### Scripts disponíveis

- **Desenvolvimento**: `npm run dev`
- **Build**: `npm run build`
- **Produção**: `npm start`

## 🗄️ Configuração do Banco de Dados

### 1. Configuração do Ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

### 2. Variáveis de Ambiente

**Para usar o repositório em memória (desenvolvimento/teste):**
```env
USE_DATABASE=false
```

**Para usar SQL Server:**
```env
USE_DATABASE=true
DB_SERVER=localhost
DB_PORT=1433
DB_DATABASE=DenunciaDB
DB_USER=sa
DB_PASSWORD=sua_senha_aqui
```

### 3. Configuração do SQL Server

#### Opção 1: SQL Server Local

1. Instale o SQL Server Developer Edition ou SQL Server Express
2. Configure uma instância local
3. Habilite a autenticação SQL Server
4. Execute o script de criação do banco:

```sql
-- Arquivo: sql/create-database.sql
USE master;
GO

IF NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'DenunciaDB')
BEGIN
    CREATE DATABASE [DenunciaDB];
END
GO

USE [DenunciaDB];
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Denuncias' AND xtype='U')
BEGIN
    CREATE TABLE [dbo].[Denuncias] (
        [IdDenuncia] INT IDENTITY(1,1) PRIMARY KEY,
        [Nome] NVARCHAR(255) NOT NULL,
        [Descricao] NVARCHAR(MAX) NOT NULL,
        [Ativa] BIT NOT NULL DEFAULT 1,
        [DataCriacao] DATETIME2 DEFAULT GETDATE(),
        [DataAtualizacao] DATETIME2 DEFAULT GETDATE()
    );
END
GO
```

#### Opção 2: SQL Server via Docker

```bash
# Execute um container SQL Server
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=SuaSenha123!" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2019-latest

# Aguarde alguns segundos para o container iniciar
# Execute o script de criação do banco
```

#### Opção 3: Azure SQL Database

1. Crie um Azure SQL Database
2. Configure o firewall para permitir conexões
3. Use a string de conexão fornecida:

```env
DB_SERVER=seu-servidor.database.windows.net
DB_DATABASE=seu-banco
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_PORT=1433
```

### 4. Testando a Conexão

Para testar se a conexão está funcionando:

1. Configure `USE_DATABASE=true` no arquivo `.env`
2. Inicie a aplicação:

```bash
npm run dev
```

3. Faça uma requisição para criar uma denúncia:

```bash
curl -X POST http://localhost:3000/api/denuncia \
  -H "Content-Type: application/json" \
  -d '{
    "Nome": "Teste de Conexão",
    "Descricao": "Testando a conexão com o banco de dados",
    "Ativa": true
  }'
```

## 📋 Endpoints da API

### Base URL
```
http://localhost:3000/api/denuncias
```

### Health Check
```
GET http://localhost:3000/health
```

### 1. Criar Denúncia
**POST** `/api/denuncias`

**Body:**
```json
{
  "Nome": "Nome da denúncia",
  "Descricao": "Descrição detalhada",
  "Ativa": true
}
```

**Response (201):**
```json
{
  "Denuncia": {
    "IdDenuncia": 1,
    "Nome": "Nome da denúncia",
    "Descricao": "Descrição detalhada",
    "Ativa": true
  }
}
```

### 2. Buscar Denúncia por ID
**GET** `/api/denuncias/:id`

**Response (200):**
```json
{
  "Denuncia": {
    "IdDenuncia": 1,
    "Nome": "Nome da denúncia",
    "Descricao": "Descrição detalhada",
    "Ativa": true
  }
}
```

### 3. Atualizar Denúncia
**PUT** `/api/denuncias/:id`

**Body (campos opcionais):**
```json
{
  "Nome": "Novo nome",
  "Descricao": "Nova descrição",
  "Ativa": false
}
```

**Response (200):**
```json
{
  "Denuncia": {
    "IdDenuncia": 1,
    "Nome": "Novo nome",
    "Descricao": "Nova descrição",
    "Ativa": false
  }
}
```

### 4. Deletar Denúncia
**DELETE** `/api/denuncias/:id`

**Response (200):**
```json
{
  "success": true
}
```

## 🔧 Estrutura do Projeto

```
src/
└── Uni7/
    ├── utils/
    │   └── errors/
    │       ├── AppError.ts
    │       └── errorHandler.ts
    └── denuncia/
        ├── models/
        │   └── IDenuncia.ts
        ├── repository/
        │   ├── interfaces/
        │   │   └── IDenunciaRepository.ts
        │   └── implementations/
        │       └── MSSQLDenunciaRepository.ts
        ├── useCase/
        │   ├── create/
        │   ├── getById/
        │   ├── update/
        │   └── delete/
        └── routes/
            └── DenunciaRoutes.ts
```

## 📝 Regras de Negócio

- **Nome**: Obrigatório, não pode estar vazio
- **Descrição**: Obrigatória, não pode estar vazia  
- **Ativa**: Obrigatório, deve ser boolean
- **ID**: Gerado automaticamente (autoincremento)

## 🔍 Códigos de Status HTTP

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Erro de validação/dados inválidos
- **404**: Recurso não encontrado
- **500**: Erro interno do servidor

## 🎯 Exemplo de uso completo

```bash
# 1. Criar uma denúncia
curl -X POST http://localhost:3000/api/denuncias \
  -H "Content-Type: application/json" \
  -d '{
    "Nome": "Problema na rua",
    "Descricao": "Buraco na rua principal",
    "Ativa": true
  }'

# 2. Buscar por ID
curl http://localhost:3000/api/denuncias/1

# 3. Atualizar
curl -X PUT http://localhost:3000/api/denuncias/1 \
  -H "Content-Type: application/json" \
  -d '{
    "Descricao": "Buraco foi consertado",
    "Ativa": false
  }'

# 4. Deletar
curl -X DELETE http://localhost:3000/api/denuncias/1
```

## ⚠️ Observações

- Atualmente usando implementação em memória para testes
- Para produção, implementar conexão real com SQL Server
- Sem autenticação implementada
- Dados são perdidos ao reiniciar a aplicação (implementação em memória)