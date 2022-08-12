import { BaseEntity, Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./Empresa";

@Entity('administrador')
export class Administrador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  @Generated('uuid')
  codigo: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  data_cadastro: Date;

  @Column()
  data_modificacao_cadastro: Date;

  /* 1 administrador para muitas empresas cadastradas */
  @OneToMany(() => Empresa, empresa => empresa.administrador, {
    cascade: ['insert', 'update']
  })
  empresas: Empresa[];
}
