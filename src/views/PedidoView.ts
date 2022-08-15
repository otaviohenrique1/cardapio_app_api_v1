import { Pedido } from "../entity/Pedido";
import ItemPedidoView from "./ItemPedidoView";

export default {
  render(pedido: Pedido) {
    const {
      id, codigo, preco_total, cliente, status_pedido,
      listaItensPedidos, data_cadastro, data_modificacao_cadastro
    } = pedido;
    return {
      id, codigo, preco_total, cliente, status_pedido,
      listaItensPedido: ItemPedidoView.renderMany(listaItensPedidos),
      data_cadastro, data_modificacao_cadastro,
    };
  },

  renderMany(pedidos: Pedido[]) {
    return pedidos.map(pedido => this.render(pedido));
  }
};