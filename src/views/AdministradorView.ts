import { Administrador } from "../entity/Administrador";

export default {
  render(administrador: Administrador) {
    const {
      id, nome, email, senha, codigo,
      data_cadastro, data_modificacao_cadastro
    } = administrador;

    return {
      id, nome, email, senha, codigo,
      data_cadastro, data_modificacao_cadastro
    };
  },
  renderMany(administradores: Administrador[]) {
    return administradores.map(administrador => this.render(administrador));
  }
};