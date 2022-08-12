import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { coluna_clienteId, coluna_codigo, coluna_data_cadastro, coluna_data_modificacao_cadastro, coluna_preco_total, coluna_primary_key, coluna_status_pedido, if_table_not_exist } from "../utils/constantes_migration";

const NOME_TABELA = 'pedido';

export class createPedidos1660324608777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA, if_table_not_exist);
    await queryRunner.createTable(new Table({
      name: NOME_TABELA,
      columns: [
        coluna_primary_key,
        coluna_preco_total,
        coluna_codigo,
        coluna_status_pedido,
        coluna_data_cadastro,
        coluna_data_modificacao_cadastro,
        coluna_clienteId,
      ]
    }), if_table_not_exist);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA);
  }
}
