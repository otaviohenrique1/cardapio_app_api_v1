import { TableColumnOptions } from "typeorm";

export const if_table_not_exist = true;

export function CriaColunaTabela(data: TableColumnOptions) {
  return { ...data };
}

export const coluna_primary_key = CriaColunaTabela({
  name: 'id',
  type: 'integer',
  unsigned: true,
  isPrimary: true,
  isGenerated: true,
  generationStrategy: 'increment'
});

export const coluna_codigo = CriaColunaTabela({
  name: 'codigo',
  type: 'varchar',
  isGenerated: true,
  generationStrategy: 'uuid'
});

export const coluna_nome = CriaColunaTabela({
  name: 'nome',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_email = CriaColunaTabela({
  name: 'email',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_senha = CriaColunaTabela({
  name: 'senha',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_status_cadastro = CriaColunaTabela({
  name: 'status_cadastro',
  type: 'boolean',
  isNullable: false,
});

export const coluna_removivel = CriaColunaTabela({
  name: 'removivel',
  type: 'boolean',
  isNullable: false,
});

export const coluna_data_cadastro = CriaColunaTabela({
  name: 'data_cadastro',
  type: 'datetime'
});

export const coluna_data_modificacao_cadastro = CriaColunaTabela({
  name: 'data_modificacao_cadastro',
  type: 'datetime'
});

export const coluna_quantidade = CriaColunaTabela({
  name: 'quantidade',
  type: 'integer',
  isNullable: false,
});

export const coluna_status_pedido = CriaColunaTabela({
  name: 'status_pedido',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_preco_total = CriaColunaTabela({
  name: 'preco_total',
  type: 'decimal',
  isNullable: false,
  precision: 10,
  scale: 2,
});

export const coluna_rua = CriaColunaTabela({
  name: 'rua',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_numero = CriaColunaTabela({
  name: 'numero',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_bairro = CriaColunaTabela({
  name: 'bairro',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_cidade = CriaColunaTabela({
  name: 'cidade',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_estado = CriaColunaTabela({
  name: 'estado',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_cep = CriaColunaTabela({
  name: 'cep',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_telefone = CriaColunaTabela({
  name: 'telefone',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_path = CriaColunaTabela({
  name: 'path',
  type: 'varchar'
});

export const coluna_preco = CriaColunaTabela({
  name: 'preco',
  type: 'decimal',
  isNullable: false,
  precision: 10,
  scale: 2,
});

/* ver se vai mudar o nome da coluna para status ou situacao */
export const coluna_ativo = CriaColunaTabela({
  name: 'ativo',
  type: 'boolean',
  isNullable: false,
});

export const coluna_status_refeicao_bebida = CriaColunaTabela({
  name: 'situacao_refeicao_bebida',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_descricao = CriaColunaTabela({
  name: 'descricao',
  type: 'text',
  isNullable: false,
});

export const coluna_unidade_quantidade = CriaColunaTabela({
  name: 'unidade_quantidade',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_tipo_produto = CriaColunaTabela({
  name: 'tipo_produto',
  type: 'varchar',
  isNullable: false,
  length: '255'
});

export const coluna_clienteId = CriaColunaTabela({
  name: 'clienteId',
  type: 'integer',
  unsigned: true,
});

export const coluna_refeicaoId = CriaColunaTabela({
  name: 'refeicaoId',
  type: 'integer',
  unsigned: true,
});

export const coluna_empresaId = CriaColunaTabela({
  name: 'empresaId',
  type: 'integer',
  unsigned: true,
});

export const coluna_pedidoId = CriaColunaTabela({
  name: 'pedidoId',
  type: 'integer',
  unsigned: true,
});

export const coluna_pedidoRefeicaoId = CriaColunaTabela({
  name: 'pedidoRefeicaoId',
  type: 'integer',
  unsigned: true,
});

export const coluna_administradorId = CriaColunaTabela({
  name: 'administradorId',
  type: 'integer',
  unsigned: true,
});