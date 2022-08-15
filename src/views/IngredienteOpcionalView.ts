import { IngredienteOpcional } from "../entity/IngredienteOpcional";

export default {
  render(ingredienteOpcional: IngredienteOpcional) {
    const { id, ingrediente, preco, itemPedidoId, produtoId, item_pedido, ingredienteId, produto } = ingredienteOpcional;
    return { id, ingrediente, preco, itemPedidoId, produtoId, item_pedido, ingredienteId, produto };
  },

  renderMany(IngredientesOpcionais: IngredienteOpcional[]) {
    return IngredientesOpcionais.map(ingredienteOpcional => this.render(ingredienteOpcional));
  }
};