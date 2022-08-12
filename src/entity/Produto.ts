import { Entity, Column, ManyToOne, OneToMany, Generated, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { Imagem } from "./Imagem";
import { Ingrediente } from "./Ingrediente";
import { IngredienteOpcional } from "./IngredienteOpcional";
import { ItemPedido } from "./ItemPedido";
import { Empresa } from "./Empresa";

@Entity('produto')
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  @Generated('uuid')
  codigo: string;

  @Column()
  data_cadastro: Date;

  @Column()
  data_modificacao_cadastro: Date;

  @Column()
  preco: number;

  @Column()
  descricao: string;

  /* ativo => status_produto ou situacao_produto */
  @Column()
  ativo: boolean; // 'ativo' => true, 'inativo' => false
  // ativo: string; // ('ativo', 'inativo', 'rejeitado', 'testes'), caso seja do tipo string

  @Column()
  quantidade: number;

  @Column()
  unidade_quantidade: string; // unidade, ml, l, mg, g, kg

  @Column()
  tipo_produto: string; // ('comida' e 'bebida')

  /* 1 refeicao com 1 ou mais imagens */
  @OneToMany(() => Imagem, imagem => imagem.produto, {
    cascade: ['insert', 'update', 'remove']
  })
  imagens: Imagem[];

  /* muitas refeicoes cadastradas por 1 usuario  */
  @ManyToOne(() => Empresa, (empresa) => empresa.produtos)
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column({ type: 'integer', unsigned: true })
  empresaId: number;

  /* 1 refeicao com 1 ou mais ingredientes */
  /* Ver se vai ser opcional */
  @OneToMany(() => Ingrediente, ingrediente => ingrediente.produto, {
    cascade: ['insert', 'update', 'remove']
  })
  ingredientes: Ingrediente[];

  /* Arrumar */
  /* Ver se vai renomear de 'PedidoRefeicao' para 'ItemPedido' ou 'PedidoProduto' */
  @OneToOne(() => ItemPedido, (pedido_item) => pedido_item.produto)
  pedido_item: ItemPedido;

  /* 1 refeicao do pedido pode ter nenhum ou 1 ou mais opcionais */
  /* Ver se vai ser opcional */
  /* Ver se vai ser cadastrado no cadastro da refeicao */
  @OneToMany(() => IngredienteOpcional, opcional => opcional.item_pedido, {
    cascade: ['insert', 'update', 'remove']
  })
  lista_opcionais: IngredienteOpcional[];
}
