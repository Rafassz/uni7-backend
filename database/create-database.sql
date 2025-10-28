-- Criação do banco de dados DenunciaDB
CREATE DATABASE DenunciaDB;
GO

-- Usar o banco criado
USE DenunciaDB;
GO

-- Criação da tabela Denuncia
CREATE TABLE Denuncia (
    IdDenuncia INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Descricao VARCHAR(255) NOT NULL,
    Ativa BIT NOT NULL DEFAULT 1,
    
    -- Campos de auditoria (opcionais)
    DataCriacao DATETIME2 DEFAULT GETDATE(),
    DataAtualizacao DATETIME2 DEFAULT GETDATE()
);
GO

-- Índices para melhor performance
CREATE INDEX IX_Denuncia_Ativa ON Denuncia(Ativa);
CREATE INDEX IX_Denuncia_Nome ON Denuncia(Nome);
GO

-- Trigger para atualizar DataAtualizacao automaticamente
CREATE TRIGGER TR_Denuncia_Update
ON Denuncia
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Denuncia 
    SET DataAtualizacao = GETDATE()
    FROM Denuncia d
    INNER JOIN inserted i ON d.IdDenuncia = i.IdDenuncia;
END;
GO

-- Inserir alguns dados de teste
INSERT INTO Denuncia (Nome, Descricao, Ativa) VALUES 
('Buraco na rua', 'Buraco grande na Rua das Flores, nº 123', 1),
('Lixo acumulado', 'Lixo acumulado na esquina da Rua A com Rua B', 1),
('Semáforo quebrado', 'Semáforo não funciona no cruzamento principal', 0);
GO

-- Verificar dados inseridos
SELECT * FROM Denuncia;
GO

-- Informações sobre a tabela criada
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Denuncia'
ORDER BY ORDINAL_POSITION;
GO