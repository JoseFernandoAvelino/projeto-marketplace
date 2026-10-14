DROP TABLE IF EXISTS mensagens, propostas, conversas, produtos, usuarios CASCADE;

CREATE TABLE usuarios (
  id         SERIAL PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  cpf        VARCHAR(11)  NOT NULL UNIQUE,
  email      VARCHAR(150) NOT NULL UNIQUE,
  senha      TEXT         NOT NULL,  
  criado_em  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE produtos (
  id               SERIAL PRIMARY KEY,
  vendedor_id      INTEGER       NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  titulo           VARCHAR(70)   NOT NULL,
  descricao        TEXT          NOT NULL DEFAULT '',
  categoria        VARCHAR(30)   NOT NULL,
  preco            NUMERIC(10,2) NOT NULL,
  condicao         VARCHAR(20)   NOT NULL,  
  aceita_proposta  BOOLEAN       NOT NULL DEFAULT TRUE,
  faz_entrega      BOOLEAN       NOT NULL DEFAULT FALSE,
  aceita_troca     BOOLEAN       NOT NULL DEFAULT FALSE,
  localizacao      VARCHAR(120)  NOT NULL DEFAULT '',
  imagens          TEXT[]        NOT NULL DEFAULT '{}',  
  criado_em        TIMESTAMP     NOT NULL DEFAULT NOW()
);


CREATE TABLE conversas (
  id            SERIAL PRIMARY KEY,
  produto_id    INTEGER   NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  comprador_id  INTEGER   NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  vendedor_id   INTEGER   NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  criado_em     TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (produto_id, comprador_id)
);

CREATE TABLE propostas (
  id           SERIAL PRIMARY KEY,
  conversa_id  INTEGER       NOT NULL REFERENCES conversas(id) ON DELETE CASCADE,
  valor        NUMERIC(10,2) NOT NULL,
  status       VARCHAR(10)   NOT NULL DEFAULT 'pendente', 
  criado_em    TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE TABLE mensagens (
  id            SERIAL PRIMARY KEY,
  conversa_id   INTEGER     NOT NULL REFERENCES conversas(id) ON DELETE CASCADE,
  remetente_id  INTEGER     NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  texto         TEXT        NOT NULL,
  tipo          VARCHAR(10) NOT NULL DEFAULT 'texto',  
  proposta_id   INTEGER     REFERENCES propostas(id) ON DELETE CASCADE,
  criado_em     TIMESTAMP   NOT NULL DEFAULT NOW()
);