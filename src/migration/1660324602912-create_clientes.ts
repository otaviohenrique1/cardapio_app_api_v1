import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { coluna_bairro, coluna_cep, coluna_cidade, coluna_codigo, coluna_data_cadastro, coluna_data_modificacao_cadastro, coluna_email, coluna_empresaId, coluna_estado, coluna_nome, coluna_numero, coluna_primary_key, coluna_rua, coluna_senha, coluna_telefone, if_table_not_exist } from "../utils/constantes_migration";

const NOME_TABELA = 'cliente';

export class createClientes1660324602912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA, if_table_not_exist);
    await queryRunner.createTable(new Table({
      name: NOME_TABELA,
      columns: [
        coluna_primary_key,
        coluna_nome,
        coluna_email,
        coluna_senha,
        coluna_rua,
        coluna_numero,
        coluna_bairro,
        coluna_cidade,
        coluna_estado,
        coluna_cep,
        coluna_telefone,
        coluna_codigo,
        coluna_data_cadastro,
        coluna_data_modificacao_cadastro,
        coluna_empresaId,
      ]
    }), if_table_not_exist);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NOME_TABELA);
  }
}
