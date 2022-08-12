import { format } from "date-fns";

type DataHoraFormatos =
  "HH:mm" |
  "HH:mm:ss" |
  "dd/MM/yyyy" |
  "yyyy-MM-dd" |
  'yyyy-MM-dd HH:mm' |
  'dd/MM/yyyy HH:mm' |
  'yyyy-MM-dd HH:mm:ss' |
  'dd/MM/yyyy HH:mm:ss';

/**
 * Classe que formata dados.
 */
export class FormatadorDados {
  /**
   * Formata data
   * Formata um valor do tipo Date no usando
   * um formato que fica na lista DataHoraFormatos.
   * @param data Valor do tipo Date
   * @param formato Valor do tipo DataHoraFormatos
   * @return Valor do tipo string formatado
   * @example
   *  let data = new Date();
   *  let resultado = FormatadorDados.FormatadorDataHora(data, 'dd/MM/yyyy');
   *  console.log(data); // Imprime => Tue Apr 12 2022 14:34:14 GMT-0300
   *  console.log(resultado); // Imprime => 12/04/2022
   */
  static FormatadorDataHora(data: Date, formato: DataHoraFormatos) {
    let resultado = format(new Date(data), formato);
    return resultado;
  }

  /**
   * Gera data formatada
   * Pega o valor da data atual e retorna um valor
   * formata usando um formato que fica na lista DataHoraFormatos.
   * @param formato Valor do tipo DataHoraFormatos
   * @return Valor do tipo string formatado
   * @example
   *  let data = new Date();
   *  let resultado = FormatadorDados.GeradorDataHoraFormata('dd/MM/yyyy');
   *  console.log(data); // Imprime => Tue Apr 12 2022 14:34:14 GMT-0300
   *  console.log(resultado); // Imprime => 12/04/2022
   */
  static GeradorDataHoraFormatada(formato: DataHoraFormatos) {
    let resultado = format(new Date(), formato);
    return resultado;
  }

  /**
   * Gera data
   * Pega o valor da data atual e retorna um valor
   * @return Valor do tipo Date
   * @example
   *  console.log(FormatadorDados.GeradorDataHora()); // Imprime => Tue Apr 12 2022 14:34:14 GMT-0300
   */
  static GeradorDataHora() {
    return new Date();
  }
}