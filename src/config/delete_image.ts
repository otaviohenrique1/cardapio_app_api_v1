import fs from "fs";
import path from "path";

/*
  Logica (de apagar ou substituir ou alterar ou adicionar) imagem no servidor (Ideias)
    1) Na pasta uploads/fotos:
      1.1) Recebe imagem, apaga imagem antiga, salva imagem nova com o mesmo nome da antiga
      1.2) Recebe imagem, apaga imagem antiga, salva imagem nova com outro nome
    2) Na tabela 'Imagem':
      2.1) Remove os dados da antiga e insere os dados da nova na tabela
      2.2) Altera os dados da antiga pelos dados da nova
*/

/**
 * Função que remove imagem do servidor
 * Função para teste
 * Procurar uma maneira de remover a imagem do servidor
 * @param nome_imagem Path/nome da imagem
 */
export async function remove_imagem(nome_imagem: string) {
  const fileDestination = path.join(__dirname, '..', '..', 'uploads', 'fotos');
  await fs.unlink(`${fileDestination}${nome_imagem}`, (error) => {
    if (error) {
      console.log("erro");
      console.log(error);
    } else {
      console.log("Arquivo apagado");
    }
  });
}