import { Pedido } from "../entity/Pedido";
import PedidoRefeicaoView from "./PedidoRefeicaoView";

export default {
  render(pedido: Pedido) {
    const {
      id, codigo, preco_total, cliente, status_pedido,
      lista_refeicoes, data_cadastro, data_modificacao_cadastro
    } = pedido;

    const pedido_lista_refeicoes = PedidoRefeicaoView
      .renderMany(lista_refeicoes);

    return {
      id, codigo, preco_total, cliente, status_pedido,
      lista_refeicoes: pedido_lista_refeicoes,
      data_cadastro, data_modificacao_cadastro,
    };
  },

  renderMany(pedidos: Pedido[]) {
    return pedidos.map(pedido => this.render(pedido));
  }
};