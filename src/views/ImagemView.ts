import { HOST, PORT, URL_CAMINHO } from "../utils/constantes";
import { Imagem } from "../entity/Imagem";

export default {
  render(imagem: Imagem) {
    const { id, path } = imagem;

    /* Mudar quando for para producao */
    // const url = `http://192.168.0.12:${PORT}/uploads/fotos/${path}`;
    // const url = `http://localhost:${PORT}/uploads/fotos/${path}`;
    
    return { 
      id, url: URL_CAMINHO, nome: path
    };
    // url: `http://192.168.0.12:3333/uploads/fotos/${imagem_path}`,
    // url: `http://localhost:3333/uploads/${image.path}`,
  },

  renderMany(imagens: Imagem[]) {
    return imagens.map(imagem => this.render(imagem));
  }
};