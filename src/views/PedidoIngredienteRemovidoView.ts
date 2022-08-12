import { IngredienteRemovido } from "../entity/IngredienteRemovido";

export default {
  render(pedido_ingrediente_removido: IngredienteRemovido) {
    const {
      id, ingrediente, ingredienteId, itemPedidoId, item_pedido
    } = pedido_ingrediente_removido;

    return {
      id, ingrediente, ingredienteId, itemPedidoId, item_pedido
    };
  },

  renderMany(pedido_ingredientes_removidos: IngredienteRemovido[]) {
    return pedido_ingredientes_removidos.map(pedido_ingrediente_removido => this.render(pedido_ingrediente_removido));
  }
};