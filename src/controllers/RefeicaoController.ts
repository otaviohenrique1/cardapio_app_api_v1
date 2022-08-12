import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { valida_alualizacao_refeicao, valida_criacao_refeicao } from "../utils/SchemasValidacao";
import Refeicao from "../entity/Refeicao";
import refeicaoView from "../views/RefeicaoView";
import { Imagem } from "../entity/Imagem";
import fs from "fs";
import path from "path";

interface IngredienteTypes {
  nome: string;
  quantidade: number;
}

interface IngredienteOpcionalTypes {
  nome: string;
  preco: number;
}

/**
 * Listar todas as refeicoes cadastradas pelo usuario, usando o id do mesmo
 */
export async function listar_refeicoes(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const refeicaoRepository = getRepository(Refeicao);
  const refeicao = await refeicaoRepository.find({
    where: { empresaId: id },
    relations: ['imagens', 'ingredientes', 'lista_opcionais'],
  });
  return response.json(refeicaoView.renderMany(refeicao));
}

/**
 * Listar todas as refeicoes cadastradas pelo usuario, usando o id do mesmo e se o valor da coluna 'ativo' for true
 */
 export async function listar_refeicoes_ativas(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const refeicaoRepository = getRepository(Refeicao);
  const refeicao = await refeicaoRepository.find({
    where: { 
      empresaId: id,
      ativo: true
    },
    relations: ['imagens', 'ingredientes', 'lista_opcionais'],
  });
  return response.json(refeicaoView.renderMany(refeicao));
}

/**
 * Busca uma refeicao cadastrada usando o id da mesma e exibe os seus dados
 */
export async function busca_refeicao(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const refeicaoRepository = getRepository(Refeicao);
  const refeicao = await refeicaoRepository.findOneOrFail(id,
    { relations: ['imagens', 'ingredientes', 'lista_opcionais'] }
  );
  return response.json(refeicaoView.render(refeicao));
}

/**
 * Cadastrada uma refeicao
 */
export async function criar_refeicao(request: Request, response: Response, next: NextFunction) {
  const { nome, preco, descricao, ativo, data_cadastro, data_modificacao_cadastro, ingredientes,
    quantidade, unidade_quantidade, tipo_produto, ingredientes_opcionais, empresa_id } = request.body;

  const refeicaoRepository = getRepository(Refeicao);

  const requestImagens = request.files as Express.Multer.File[];
  const imagens = requestImagens.map((imagem) => {
    return { path: imagem.filename };
  });

  const ingredientes_lista = JSON.parse(ingredientes);
  
  const lista_opcionais = JSON.parse(ingredientes_opcionais);

  const data = {
    nome, preco, descricao, ativo, data_cadastro, data_modificacao_cadastro, imagens,
    ingredientes: ingredientes_lista, ingredientes_opcionais: lista_opcionais,
    quantidade, unidade_quantidade, tipo_produto, empresaId: empresa_id
  };

  await valida_criacao_refeicao.validate(data, { abortEarly: false });
  const refeicao = refeicaoRepository.create(data);
  await refeicaoRepository.save(refeicao);

  return response.status(201).json(refeicao);
}

/**
 * Apaga uma refeicao, usando o id da mesma
 */
export async function apagar_refeicao(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const refeicaoRepository = getRepository(Refeicao);
  const imagemRepository = getRepository(Imagem);

  const imagem = await imagemRepository.find({
    where: { refeicaoId: id },
  });

  imagem.forEach(async (item) => {
    const fileDestination = path.join(__dirname, '..', '..', 'uploads', 'fotos');
    fs.unlink(`${fileDestination}${item.path}`, (error) => {
      if (error) {
        console.log(error);
      }
      // else { 
      //   console.log("Arquivo apagado");
      // }
    });
    await imagemRepository.delete(item.refeicaoId);
  })

  const refeicao = await refeicaoRepository.delete(id);

  return response.status(200).json(refeicao);
}

interface FotoType {
  id: number;
  url: string;
  nome: string;
}

/**
 * Atualiza os dados de uma refeicao, usando o id da mesma para busca-la no banco de dados
 */
export async function atualizar_refeicao(request: Request, response: Response, next: NextFunction) {
  const { id, nome, preco, descricao, ativo, imagens_removidas,
    quantidade, unidade_quantidade, tipo_produto } = request.body;
  const refeicaoRepository = getRepository(Refeicao);

  /* Testar */
  let lista_imagens_removidas = (imagens_removidas as FotoType[]);
  const imagemRepository = getRepository(Imagem);
  lista_imagens_removidas.forEach(async (item) => {
    await imagemRepository.delete(item.id);
    const fileDestination = path.join(__dirname, '..', '..', 'uploads', 'fotos');
    fs.unlink(`${fileDestination}${item.nome}`, (error) => {
      if (error) {
        console.log(error);
      }
      // else { 
      //   console.log("Arquivo apagado");
      // }
    });
  });

  const requestImagens = request.files as Express.Multer.File[];
  const imagens = requestImagens.map((imagem) => {
    return { path: imagem.filename };
  });

  const requestIngredientes = request.body.ingredientes as IngredienteTypes[];
  const ingredientes = requestIngredientes.map((ingrediente) => {
    const { nome, quantidade } = ingrediente;
    return { nome, quantidade };
  });

  const requestIngredientesOpcionais = request.body.ingredientes_opcionais as IngredienteOpcionalTypes[];
  const lista_opcionais = requestIngredientesOpcionais.map((ingrediente_opcional) => {
    const { nome, preco } = ingrediente_opcional;
    return { nome, preco };
  });

  const data = { nome, preco, ingredientes, ativo, descricao,
    imagens, quantidade, unidade_quantidade, tipo_produto, lista_opcionais };

  await valida_alualizacao_refeicao.validate(data, { abortEarly: false });
  const refeicao = await refeicaoRepository.update(id, data);

  return response.status(201).json(refeicao);
}
