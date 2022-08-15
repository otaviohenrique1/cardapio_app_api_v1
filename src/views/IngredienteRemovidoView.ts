import { IngredienteRemovido } from "../entity/IngredienteRemovido";

export default {
  render(ingredienteRemovido: IngredienteRemovido) {
    const {
      id, ingrediente, ingredienteId, itemPedidoId, item_pedido
    } = ingredienteRemovido;

    return {
      id, ingrediente, ingredienteId, itemPedidoId, item_pedido
    };
  },

  renderMany(ingredientesRemovidos: IngredienteRemovido[]) {
    return ingredientesRemovidos.map(ingredienteRemovido => this.render(ingredienteRemovido));
  }
};