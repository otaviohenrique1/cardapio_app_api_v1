import { Produto } from "../entity/Produto";
import ImagemView from "./ImagemView";
import IngredienteView from "./IngredienteView";

export default {
  render(produto: Produto) {
    const {
      id, nome, preco, ingredientes, imagens, descricao, ativo, codigo,
      data_cadastro, data_modificacao_cadastro, empresa, quantidade,
      unidade_quantidade, tipo_produto
    } = produto;
    
    return {
      id, nome, preco,
      ingredientes: IngredienteView.renderMany(ingredientes),
      imagens: ImagemView.renderMany(imagens), descricao, ativo,
      codigo, data_cadastro, data_modificacao_cadastro, empresa,
      quantidade, unidade_quantidade, tipo_produto
    };
  },
  renderMany(refeicoes: Produto[]) {
    return refeicoes.map(produto => this.render(produto));
  }
};