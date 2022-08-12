import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "./Produto";

@Entity('ingrediente')
export class Ingrediente extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  quantidade: number;

  @Column()
  unidade_quantidade: string; // unidade, ml, l, mg, g, kg
  
  @Column()
  removivel: boolean;
  
  @Column()
  opcional: boolean;
  
  /* 1 ou mais ingredientes para 1 refeicao */
  @ManyToOne(() => Produto, (produto) => produto.ingredientes)
  @JoinColumn({ name: 'produtoId' })
  produto: Produto;

  @Column({ type: 'integer', unsigned: true })
  produtoId: number;

  /* Arrumar */
  @OneToOne(() => Ingrediente, (ingrediente) => ingrediente.ingrediente_opcional)
  ingrediente_opcional: Ingrediente;

  /* Arrumar */
  @OneToOne(() => Ingrediente, (ingrediente) => ingrediente.ingrediente_removivel)
  ingrediente_removivel: Ingrediente;
}
