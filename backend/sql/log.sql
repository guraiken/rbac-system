
CREATE TABLE logs IF NOT EXISTS (
  id int NOT NULL AUTO_INCREMENT,
  usuario int DEFAULT NULL,
  datahora datetime DEFAULT CURRENT_TIMESTAMP,
  acao varchar(150) DEFAULT NULL,
  mensagem text,
  recurso_afetado varchar(150) DEFAULT NULL,
  id_recurso_afetado varchar(45) DEFAULT NULL,
  valor_antigo varchar(250) DEFAULT NULL,
  valor_novo varchar(250) DEFAULT NULL,
  campos_alterados text,
  ip varchar(45) DEFAULT NULL,
  codigo_http int DEFAULT NULL,
  status_acao varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
)