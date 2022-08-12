import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { coluna_removivel, coluna_nome, coluna_primary_key, coluna_quantidade, coluna_refeicaoId, coluna_unidade_quantidade, if_table_not_exist } from "../utils/constantes_migration";

const NOME_TABELA = 'ingrediente';

export class createIngredientes1660324607226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA, if_table_not_exist);
    await queryRunner.createTable(new Table({
      name: NOME_TABELA,
      columns: [
        coluna_primary_key,
        coluna_nome,
        coluna_quantidade,
        coluna_unidade_quantidade,
        coluna_removivel,
        coluna_refeicaoId,
      ],
    }), if_table_not_exist);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA);
  }
}
