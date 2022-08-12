import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Pedido } from "../entity/Pedido";
import pedidoView from "../views/PedidoView";
import { valida_alualizacao_pedido, valida_criacao_pedido } from "../utils/SchemasValidacao";

interface PedidoRefeicaoTypes {
  refeicaoId: number;
  quantidade: number;
}

/**
 * Listar todas os pedidos cadastrados
 */
export async function listar_pedidos(request: Request, response: Response, next: NextFunction) {
  const pedidoRepository = getRepository(Pedido);
  const pedido = await pedidoRepository.find();
  return response.json(pedido);
}

/**
 * Busca um pedido cadastrado usando o codigo do mesmo e exibe os seus dados
 */
export async function busca_pedido(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const pedidoRepository = getRepository(Pedido);
  const pedido = await pedidoRepository.findOneOrFail(id, { relations: ['lista_refeicoes'] });
  return response.json(pedidoView.render(pedido));
}

/**
 * Cadastra um pedido
 */
export async function criar_pedido(request: Request, response: Response, next: NextFunction) {
  const {
    nome, status_pedido, preco_total,
    data_cadastro, data_modificacao_cadastro
  } = request.body;

  const pedidoRepository = getRepository(Pedido);

  const requestPedidoRefeicao = request.body.ingredientes as PedidoRefeicaoTypes[];
  const lista_refeicoes = requestPedidoRefeicao.map((pedido_refeicao) => {
    const { refeicaoId, quantidade } = pedido_refeicao;
    return { refeicaoId, quantidade };
  });

  const data = {
    nome, status_pedido, lista_refeicoes, preco_total,
    data_cadastro, data_modificacao_cadastro
  };

  await valida_criacao_pedido.validate(data, { abortEarly: false });
  const pedido = pedidoRepository.create(data);
  await pedidoRepository.save(pedido);

  return response.status(201).json(pedido);
}

/**
 * Atualiza os dados de um pedido, usando o codigo do mesmo para busca-lo no banco de dados
 */
export async function atualizar_pedido(request: Request, response: Response, next: NextFunction) {
  const { id, status_pedido, data_modificacao_cadastro } = request.body;
  const pedidoRepository = getRepository(Pedido);
  const data = { status_pedido, data_modificacao_cadastro };

  await valida_alualizacao_pedido.validate(data, { abortEarly: false });
  const pedido = await pedidoRepository.update(id, data);

  return response.status(201).json(pedido);
}

// export default {
//   /**
//    * Listar todas os pedidos cadastrados
//    */
//   async index(request: Request, response: Response, next: NextFunction) {
//     const pedidoRepository = getRepository(Pedido);
//     const pedido = await pedidoRepository.find();
//     return response.json(pedido);
//   },
//   /**
//    * Busca um pedido cadastrado usando o codigo do mesmo e exibe os seus dados
//    */
//   async show(request: Request, response: Response, next: NextFunction) {
//     const { id } = request.params;
//     const pedidoRepository = getRepository(Pedido);
//     const pedido = await pedidoRepository.findOneOrFail(id, { relations: ['lista_refeicoes'] });
//     return response.json(pedidoView.render(pedido));
//   },
//   /**
//    * Cadastra um pedido
//    */
//   async create(request: Request, response: Response, next: NextFunction) {
//     const {
//       nome, status_pedido, preco_total,
//       data_cadastro, data_modificacao_cadastro
//     } = request.body;

//     const pedidoRepository = getRepository(Pedido);

//     const requestPedidoRefeicao = request.body.ingredientes as PedidoRefeicaoTypes[];
//     const lista_refeicoes = requestPedidoRefeicao.map((pedido_refeicao) => {
//       const { refeicaoId, quantidade } = pedido_refeicao;
//       return { refeicaoId, quantidade };
//     });

//     const data = {
//       nome, status_pedido, lista_refeicoes, preco_total,
//       data_cadastro, data_modificacao_cadastro
//     };

//     await valida_criacao_pedido.validate(data, { abortEarly: false });
//     const pedido = pedidoRepository.create(data);
//     await pedidoRepository.save(pedido);

//     return response.status(201).json(pedido);
//   },
//   /**
//    * Atualiza os dados de um pedido, usando o codigo do mesmo para busca-lo no banco de dados
//    */
//   async update(request: Request, response: Response, next: NextFunction) {
//     const { id, status_pedido, data_modificacao_cadastro } = request.body;
//     const pedidoRepository = getRepository(Pedido);
//     const data = { status_pedido, data_modificacao_cadastro };

//     await valida_alualizacao_pedido.validate(data, { abortEarly: false });
//     const pedido = await pedidoRepository.update(id, data);

//     return response.status(201).json(pedido);
//   },
// };
