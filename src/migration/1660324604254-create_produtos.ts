import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { coluna_ativo, coluna_codigo, coluna_data_cadastro, coluna_data_modificacao_cadastro, coluna_descricao, coluna_nome, coluna_preco, coluna_primary_key, coluna_quantidade, coluna_tipo_produto, coluna_unidade_quantidade, coluna_empresaId, if_table_not_exist } from "../utils/constantes_migration";

const NOME_TABELA = 'refeicao';

export class createProdutos1660324604254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA, if_table_not_exist);
    await queryRunner.createTable(new Table({
      name: NOME_TABELA,
      columns: [
        coluna_primary_key,
        coluna_nome,
        coluna_preco,
        coluna_ativo,
        coluna_codigo,
        coluna_descricao,
        coluna_quantidade,
        coluna_unidade_quantidade,
        coluna_tipo_produto,
        coluna_data_cadastro,
        coluna_data_modificacao_cadastro,
        coluna_empresaId,
      ],
    }), if_table_not_exist);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA);
  }
}
