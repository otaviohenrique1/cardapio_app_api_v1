import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./Pedido";
import { IngredienteRemovido } from "./IngredienteRemovido";
import { IngredienteOpcional } from "./IngredienteOpcional";
import { Produto } from "./Produto";

 /* Ver se vai renomear de 'PedidoRefeicao' para 'PedidoItem' ou 'PedidoProduto' */
@Entity('item_pedido')
export class ItemPedido extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /* Arrumar */
  /* Ver se vai mudar de 'OneToOne' para 'OneToMany'*/
  /* Ver se vai renomear de 'produtoId' para produtoId */
  @OneToOne(() => Produto, (produto) => produto.pedido_item)
  @JoinColumn({ name: 'produtoId' })
  produto: Produto;

  /* Ver se vai renomear de 'produtoId' para produtoId */
  @Column({ type: 'integer', unsigned: true })
  produtoId: number;

  @Column()
  quantidade: number;

  /* muitas refeicoes em 1 pedido */
  @ManyToOne(() => Pedido, pedido => pedido.lista_refeicoes)
  @JoinColumn({ name: 'pedidoId' })
  pedido: Pedido;

  @Column({ type: 'integer', unsigned: true })
  pedidoId: number;

  /* 1 refeicao do pedido pode ter nenhum ou 1 ou mais opcionais */
  /* Ver se vai ser opcional */
  @OneToMany(() => IngredienteOpcional, opcional => opcional.item_pedido, {
    cascade: ['insert']
  })
  ingredientes_opcionais: IngredienteOpcional[];

  /* Nenhum ou 1 ou mais ingredientes podem ser removidos de 1 refeicao */
  /* Ver se vai ser opcional */
  @OneToMany(() => IngredienteRemovido, ingrediente_removido => ingrediente_removido.item_pedido, {
    cascade: ['insert']
  })
  ingredientes_removidos: IngredienteRemovido[];
}
