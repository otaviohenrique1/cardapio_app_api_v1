import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { if_table_not_exist, coluna_primary_key, coluna_nome, coluna_preco, coluna_pedidoRefeicaoId, coluna_refeicaoId } from "../utils/constantes_migration";

const NOME_TABELA = 'pedido_opcional_adicionado';

export class createIngredientesOpcionais1660324613533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable(NOME_TABELA, if_table_not_exist);
    await queryRunner.createTable(new Table({
      name: NOME_TABELA,
      columns: [
        coluna_primary_key,
        coluna_nome,
        coluna_preco,
        coluna_pedidoRefeicaoId,
        coluna_refeicaoId,
      ],
    }), if_table_not_exist);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA);
  }
}
