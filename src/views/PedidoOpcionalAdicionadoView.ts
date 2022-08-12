import { IngredienteOpcional } from "../entity/IngredienteOpcional";

export default {
  render(pedido_opcional_adicionado: IngredienteOpcional) {
    const {
      id, ingrediente, preco, itemPedidoId, produtoId, item_pedido, ingredienteId, produto
    } = pedido_opcional_adicionado;

    return {
      id, ingrediente, preco, itemPedidoId, produtoId, item_pedido, ingredienteId, produto
    };
  },

  renderMany(pedido_opcionais_adicionados: IngredienteOpcional[]) {
    return pedido_opcionais_adicionados.map(pedido_opcional_adicionado => this.render(pedido_opcional_adicionado));
  }
};