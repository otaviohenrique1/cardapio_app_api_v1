import { AES, enc, format, lib, SHA512 } from "crypto-js";

export class FormatadorCrypto {
  /**
   * Converte mensagem para um hash usando SHA512.
   * @param mensagem Valor do tipo string
   * @return Valor hash
   */
  static mensagemSHA512(mensagem: string) {
    const resultado = SHA512(mensagem).toString(enc.Hex);
    return resultado;
  }

  /**
   * Ecripta uma mensagem
   * @param mensagem Valor com tipos string | lib.WordArray
   * @returns Valor do tipo string
   */
  static encrypt_message(mensagem: string | lib.WordArray) {
    const secret_key = "chave_teste"; /* alterar, colocar chave RSA */
    let resultado = AES
      .encrypt(mensagem, secret_key)
      .toString(format.OpenSSL);
    return resultado;
  }

  /**
   * Decripta uma mensagem encriptada
   * @param mensagem Valor com tipos string | lib.CipherParams
   * @returns Valor do tipo string
   */
  static decrypt_message(mensagem: string | lib.CipherParams) {
    const secret_key = "chave_teste"; /* alterar, colocar chave RSA */
    let resultado = AES
      .decrypt(mensagem, secret_key)
      .toString(enc.Utf8);
    return resultado;
  }
}
