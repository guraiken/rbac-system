-- Execute no banco configurado em DB_NAME antes de sql/comments.sql:
-- a tabela de comentários referencia materials (id).
-- Não apaga uma tabela que já exista.
CREATE TABLE IF NOT EXISTS materials (
  -- INT com sinal: precisa ter o mesmo tipo de comments.material_id para a chave estrangeira.
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  INDEX idx_materials_category (category)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Materiais de exemplo, inseridos só quando a tabela está vazia:
-- rodar o script de novo não duplica nem altera registros existentes.
INSERT INTO materials (name, category)
SELECT seed.name, seed.category
FROM (
  SELECT 'Detergente neutro' AS name, 'Limpeza' AS category
  UNION ALL SELECT 'Desinfetante', 'Limpeza'
  UNION ALL SELECT 'Papel sulfite A4', 'Escritório'
  UNION ALL SELECT 'Caneta esferográfica', 'Escritório'
  UNION ALL SELECT 'Luva nitrílica', 'EPI'
  UNION ALL SELECT 'Óculos de proteção', 'EPI'
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM materials);

-- Se a tabela já existir, confira sua estrutura com SHOW CREATE TABLE materials.
-- A API usa as colunas id, name e category.
