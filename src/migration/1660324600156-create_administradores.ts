import { MigrationInterface, QueryRunner } from "typeorm"
const NOME_TABELA = 'administrador';

export class createAdministradores1660324600156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
