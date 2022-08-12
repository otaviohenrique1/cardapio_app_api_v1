import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ingrediente } from "./Ingrediente";
import { ItemPedido } from "./ItemPedido";
import { Produto } from "./Produto";

@Entity('ingrediente_opcional')
export class IngredienteOpcional extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  preco: number;

  /* Arrumar */
  /* Ver se vai mudar de 'OneToOne' para 'OneToMany'*/
  @OneToOne(() => Ingrediente, (ingrediente) => ingrediente.ingrediente_opcional)
  @JoinColumn({ name: 'ingredienteId' })
  ingrediente: Ingrediente;

  @Column({ type: 'integer', unsigned: true })
  ingredienteId: number;
  
  /* muitos opcionais em 1 pedido */
  @ManyToOne(() => ItemPedido, (itemPedido) => itemPedido.ingredientes_opcionais)
  @JoinColumn({ name: 'itemPedidoId' })
  pedido_refeicao: ItemPedido;

  @Column({ type: 'integer', unsigned: true })
  itemPedidoId: number;

  /* muitos opcionais em 1 produto */
  @ManyToOne(() => Produto, (produto) => produto.lista_opcionais)
  @JoinColumn({ name: 'produtoId' })
  produto: Produto;

  @Column({ type: 'integer', unsigned: true })
  produtoId: number;
}
