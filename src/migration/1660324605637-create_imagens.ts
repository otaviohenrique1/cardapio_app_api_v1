import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { coluna_path, coluna_primary_key, coluna_refeicaoId, if_table_not_exist } from "../utils/constantes_migration";

const NOME_TABELA = 'imagem';

export class createImagens1660324605637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA, if_table_not_exist);
    await queryRunner.createTable(new Table({
      name: NOME_TABELA,
      columns: [
        coluna_primary_key,
        coluna_path,
        coluna_refeicaoId,
      ],
    }), if_table_not_exist);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA);
  }
}
