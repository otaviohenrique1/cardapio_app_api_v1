import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Ingrediente } from "./Ingrediente";
import { ItemPedido } from "./ItemPedido";

@Entity('ingrediente_removido')
export class IngredienteRemovido extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /* Arrumar */
  /* Ver se vai mudar de 'OneToOne' para 'OneToMany'*/
  @OneToOne(() => Ingrediente, (ingrediente) => ingrediente.ingrediente_removivel)
  @JoinColumn({ name: 'ingredienteId' })
  ingrediente: Ingrediente;

  @Column({ type: 'integer', unsigned: true })
  ingredienteId: number;
 
  /* muitos opcionais em 1 pedido */
  @ManyToOne(() => ItemPedido, (item_pedido) => item_pedido.ingredientes_removidos)
  @JoinColumn({ name: 'itemPedidoId' })
  item_pedido: ItemPedido;

  @Column({ type: 'integer', unsigned: true })
  itemPedidoId: number;
}
