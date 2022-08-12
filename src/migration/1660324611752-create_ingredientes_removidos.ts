import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { if_table_not_exist, coluna_primary_key, coluna_nome, coluna_pedidoRefeicaoId } from "../utils/constantes_migration";

const NOME_TABELA = 'pedido_ingrediente_removido';

export class createIngredientesRemovidos1660324611752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA, if_table_not_exist);
    await queryRunner.createTable(new Table({
      name: NOME_TABELA,
      columns: [
        coluna_primary_key,
        coluna_nome,
        coluna_pedidoRefeicaoId,
      ],
    }), if_table_not_exist);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA);
  }
}
