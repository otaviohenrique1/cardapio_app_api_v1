import { ItemPedido } from "../entity/ItemPedido";

export default {
  render(pedido_item: ItemPedido) {
    const {
      id, produtoId, quantidade, pedidoId
    } = pedido_item;

    return {
      id, produtoId, quantidade, pedidoId
    };
  },

  renderMany(lista_refeicoes: ItemPedido[]) {
    return lista_refeicoes.map(pedido_item => this.render(pedido_item));
  }
};