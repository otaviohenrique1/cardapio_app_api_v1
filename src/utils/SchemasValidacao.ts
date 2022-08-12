import { GeradorMensagem } from "./GeradorMensagem";
import * as Yup from "yup";
import { EMAIL_INVALIDO, valor_minimo_carateres, MINIMO_CARACTERES, valor_maximo_carateres, MAXIMO_CARACTERES } from "./constantes";

/* Schemas de validacao */
export const valida_id = Yup
  .number()
  .required(GeradorMensagem.GeraMensagemSimples('Campo vazio'));

export const valida_nome = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('nome'));

export const valida_email = Yup
  .string()
  .email(EMAIL_INVALIDO)
  .required(GeradorMensagem.GeraMensagemErro('email'));

export const valida_senha = Yup
  .string()
  .min(valor_minimo_carateres, MINIMO_CARACTERES)
  .max(valor_maximo_carateres, MAXIMO_CARACTERES)
  .required(GeradorMensagem.GeraMensagemErro('senha'));

export const valida_data_cadastro = Yup
  .date()
  .required(GeradorMensagem.GeraMensagemErro('data_cadastro'));

export const valida_data_modificacao_cadastro = Yup
  .date()
  .required(GeradorMensagem.GeraMensagemErro('data_modificacao_cadastro'));

export const valida_rua = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('rua'));

export const valida_numero = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('numero'));

export const valida_bairro = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('bairro'));

export const valida_cidade = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('cidade'));

export const valida_estado = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('estado'));

export const valida_cep = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('cep'));

export const valida_telefone = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('telefone'));

export const valida_status_cadastro = Yup
  .boolean()
  .required(GeradorMensagem.GeraMensagemErro('status_cadastro'));

export const valida_status_pedido = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('status_pedido'));

export const valida_preco = Yup
  .number()
  .required(GeradorMensagem.GeraMensagemErro('preco'));

export const valida_preco_total = Yup
  .number()
  .required(GeradorMensagem.GeraMensagemErro('preco_total'));

export const valida_quantidade = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('nome'));

export const valida_quantidade_unidade = Yup
  .number()
  .required(GeradorMensagem.GeraMensagemErro('quantidade_unidade'));

export const valida_tipo_produto = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('tipo_produto'));

// export const valida_ingredientes = Yup
//   .string()
//   .required(GeradorMensagem.GeraMensagemErro('ingredientes'));

export const valida_descricao = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('descricao'));

export const valida_ativo = Yup
  .boolean()
  .required(GeradorMensagem.GeraMensagemErro('ativo'));

export const valida_ingrediente_removivel = Yup
  .boolean()
  .required(GeradorMensagem.GeraMensagemErro('ingrediente_removivel'));

export const valida_path = Yup
  .string()
  .required(GeradorMensagem.GeraMensagemErro('path'));

export const valida_imagens = Yup
  .array(
    Yup
      .object()
      .shape({
        path: valida_path
      })
  );

export const valida_lista_ingredientes = Yup
  .array(
    Yup
      .object()
      .shape({
        nome: valida_nome,
        quantidade: valida_quantidade,
        quantidade_unidade: valida_quantidade_unidade,
        ingrediente_removivel: valida_ingrediente_removivel
  })
  );

export const valida_lista_pedido_ingredientes_removidos = Yup
  .array(
    Yup
      .object()
      .shape({
        nome: valida_nome,
      })
  );

export const valida_lista_pedido_opcionais_adicionados = Yup
  .array(
    Yup
      .object()
      .shape({
        nome: valida_nome,
        preco: valida_preco,
      })
  );

export const valida_lista_refeicoes = Yup
  .array(
    Yup
      .object()
      .shape({
        refeicaoId: valida_id,
        quantidade: valida_quantidade
      })
  );

export const valida_criacao_administrador = Yup
  .object()
  .shape({
    nome: valida_nome,
    email: valida_email,
    senha: valida_senha,
    data_cadastro: valida_data_cadastro,
    data_modificacao_cadastro: valida_data_modificacao_cadastro,
  });

export const valida_alualizacao_administrador = Yup
  .object()
  .shape({
    nome: valida_nome,
    email: valida_email,
    senha: valida_senha,
    data_modificacao_cadastro: valida_data_cadastro,
  });

export const valida_criacao_cliente = Yup
  .object()
  .shape({
    nome: valida_nome,
    rua: valida_rua,
    numero: valida_numero,
    bairro: valida_bairro,
    cidade: valida_cidade,
    estado: valida_estado,
    cep: valida_cep,
    telefone: valida_telefone,
    email: valida_email,
    senha: valida_senha,
    data_cadastro: valida_data_cadastro,
    data_modificacao_cadastro: valida_data_modificacao_cadastro,
  });

export const valida_alualizacao_cliente = Yup
  .object()
  .shape({
    nome: valida_nome,
    rua: valida_rua,
    numero: valida_numero,
    bairro: valida_bairro,
    cidade: valida_cidade,
    estado: valida_estado,
    cep: valida_cep,
    telefone: valida_telefone,
    email: valida_email,
    senha: valida_senha,
    data_modificacao_cadastro: valida_data_modificacao_cadastro,
  });

export const valida_criacao_empresa = Yup
  .object()
  .shape({
    nome: valida_nome,
    email: valida_email,
    senha: valida_senha,
    status_cadastro: valida_status_cadastro,
    data_cadastro: valida_data_cadastro,
    data_modificacao_cadastro: valida_data_modificacao_cadastro,
  });

export const valida_atualizacao_empresa = Yup
  .object()
  .shape({
    nome: valida_nome,
    email: valida_email,
    senha: valida_senha,
    status_cadastro: valida_status_cadastro,
    data_modificacao_cadastro: valida_data_modificacao_cadastro,
  });

export const valida_criacao_pedido = Yup
  .object()
  .shape({
    nome: valida_nome,
    status_pedido: valida_status_pedido,
    preco_total: valida_preco_total,
    lista_refeicoes: valida_lista_refeicoes,
    data_cadastro: valida_data_cadastro,
    data_modificacao_cadastro: valida_data_modificacao_cadastro,
  });

export const valida_alualizacao_pedido = Yup
  .object()
  .shape({
    nome: valida_nome,
    status_pedido: valida_status_pedido,
    data_modificacao_cadastro: valida_data_modificacao_cadastro,
  });

export const valida_criacao_refeicao = Yup
  .object()
  .shape({
    nome: valida_nome,
    preco: valida_preco,
    ingredientes: valida_lista_ingredientes,
    descricao: valida_descricao,
    ativo: valida_ativo,
    imagens: valida_imagens,
    quantidade: valida_quantidade,
    quantidade_unidade: valida_quantidade_unidade,
    tipo_produto: valida_tipo_produto,
    data_cadastro: valida_data_cadastro,
    data_modificacao_cadastro: valida_data_modificacao_cadastro,
  });

export const valida_alualizacao_refeicao = Yup
  .object()
  .shape({
    nome: valida_nome,
    preco: valida_preco,
    ingredientes: valida_lista_ingredientes,
    descricao: valida_descricao,
    ativo: valida_ativo,
    quantidade: valida_quantidade,
    quantidade_unidade: valida_quantidade_unidade,
    tipo_produto: valida_tipo_produto,
    imagens: valida_imagens,
    data_modificacao_cadastro: valida_data_modificacao_cadastro,
  });

// export const valida_criacao_empresa = Yup
//   .object()
//   .shape({
//     nome: valida_nome,
//     email: valida_email,
//     senha: valida_senha,
//     data_cadastro: valida_data_cadastro,
//     data_modificacao_cadastro: valida_data_modificacao_cadastro,
//   });

// export const valida_alualizacao_empresa = Yup
//   .object()
//   .shape({
//     nome: valida_nome,
//     email: valida_email,
//     senha: valida_senha,
//     data_modificacao_cadastro: valida_data_modificacao_cadastro,
//   });