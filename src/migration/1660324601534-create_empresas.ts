import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { coluna_administradorId, coluna_codigo, coluna_data_cadastro, coluna_data_modificacao_cadastro, coluna_email, coluna_nome, coluna_primary_key, coluna_senha, coluna_status_cadastro, if_table_not_exist } from "../utils/constantes_migration";

const NOME_TABELA = 'empresa';

export class createEmpresas1660324601534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA, if_table_not_exist);
    await queryRunner.createTable(new Table({
      name: NOME_TABELA,
      columns: [
        coluna_primary_key,
        coluna_nome,
        coluna_email,
        coluna_senha,
        coluna_codigo,
        coluna_status_cadastro,
        coluna_data_cadastro,
        coluna_data_modificacao_cadastro,
        coluna_administradorId,
      ],
    }), if_table_not_exist);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA);
  }
}
