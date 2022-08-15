import { Cliente } from "../entity/Cliente";
import PedidoView from "./PedidoView";

export default {
  render(cliente: Cliente) {
    const {
      id, codigo, nome, rua, numero, bairro, cidade,
      estado, email, senha, cep, telefone, pedidos,
      data_cadastro, data_modificacao_cadastro, empresaId
    } = cliente;

    return {
      id, codigo, nome, rua, numero, bairro, cidade,
      estado, email, senha, cep, pedidos: PedidoView.renderMany(pedidos),
      telefone, data_cadastro, data_modificacao_cadastro, empresaId
    };
  },

  renderMany(cliente: Cliente[]) {
    return cliente.map(cliente => this.render(cliente));
  }
};