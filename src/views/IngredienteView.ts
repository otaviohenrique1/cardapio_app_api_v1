import { Ingrediente } from "../entity/Ingrediente";

export default {
  render(ingrediente: Ingrediente) {
    const {
      id, nome, quantidade, unidade_quantidade, produtoId, removivel, ingrediente_opcional, ingrediente_removivel, opcional, produto
    } = ingrediente;

    return {
      id, nome, quantidade, unidade_quantidade, produtoId, removivel, ingrediente_opcional, ingrediente_removivel, opcional, produto
    };
  },

  renderMany(ingredientes: Ingrediente[]) {
    return ingredientes.map(ingrediente => this.render(ingrediente));
  }
};