/**
 * Classe que exibe mensagem.
 */
export class GeradorMensagem {
  /**
   * Gera mensagem simples.
   * @param mensagem Valor do tipo string
   * @return Valor do tipo string
   */
  static GeraMensagemSimples(mensagem: string) {
    return mensagem;
  }

  /**
   * Gera mensagem de erro.
   * @param nome_campo Valor do tipo string
   * @return Valor do tipo string
   */
  static GeraMensagemErro(nome_campo: string) {
    let texto = `Campo ${nome_campo} esta vazio`;
    let resultado = this.GeraMensagemSimples(texto);
    return resultado;
  }
}
