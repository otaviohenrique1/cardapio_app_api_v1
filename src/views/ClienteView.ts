import { Cliente } from "../entity/Cliente";
import PedidoView from "./PedidoView";

export default {
  render(cliente: Cliente) {
    const {
      id, codigo, nome, rua, numero, bairro, cidade,
      estado, email, senha, cep, telefone, pedidos,
      data_cadastro, data_modificacao_cadastro, empresaId
    } = cliente;

    const lista_pedidos = PedidoView.renderMany(pedidos);

    return {
      id, codigo, nome, rua, numero, bairro, cidade,
      estado, email, senha, cep, pedidos: lista_pedidos,
      telefone, data_cadastro, data_modificacao_cadastro, empresaId
    };
  },

  renderMany(cliente: Cliente[]) {
    return cliente.map(cliente => this.render(cliente));
  }
};