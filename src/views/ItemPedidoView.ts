import { ItemPedido } from "../entity/ItemPedido";

export default {
  render(itemPedido: ItemPedido) {
    const { id, produtoId, quantidade, pedidoId } = itemPedido;
    return { id, produtoId, quantidade, pedidoId };
  },

  renderMany(listaProdutos: ItemPedido[]) {
    return listaProdutos.map(itemPedido => this.render(itemPedido));
  }
};