import { Empresa } from "../entity/Empresa";

export default {
  render(empresa: Empresa) {
    const {
      id, nome, email, senha, codigo, status_cadastro,
      data_cadastro, data_modificacao_cadastro
    } = empresa;
    return {
      id, nome, email, senha, codigo, status_cadastro,
      data_cadastro, data_modificacao_cadastro
    };
  },
  renderMany(Empresas: Empresa[]) {
    return Empresas.map(empresa => this.render(empresa));
  }
};