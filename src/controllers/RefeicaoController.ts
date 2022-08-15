import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/connection";
import { valida_alualizacao_refeicao as valida_alualizacao_produto, valida_criacao_refeicao as valida_criacao_produto } from "../utils/SchemasValidacao";
import { Produto } from "../entity/Produto";
import produtoView from "../views/ProdutoView";
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
 * Listar todas os produtos cadastradas pelo usuario, usando o id do mesmo
 */
export async function listar_produtos(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const produtoRepository = AppDataSource.getRepository(Produto);
  const produto = await produtoRepository.find({
    where: {
      empresaId: parseInt(id),
    },
    relations: ['imagens', 'ingredientes', 'lista_opcionais'],
  });
  return response.json(produtoView.renderMany(produto));
}

/**
 * Listar todas as refeicoes cadastradas pelo usuario, usando o id do mesmo e se o valor da coluna 'ativo' for true
 */
 export async function listar_produtos_ativas(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const produtoRepository = AppDataSource.getRepository(Produto);
  const produto = await produtoRepository.find({
    where: { 
      empresaId: parseInt(id),
      ativo: true
    },
    relations: ['imagens', 'ingredientes', 'lista_opcionais'],
  });
  return response.json(produtoView.renderMany(produto));
}

/**
 * Busca uma refeicao cadastrada usando o id da mesma e exibe os seus dados
 */
export async function busca_produto(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const produtoRepository = AppDataSource.getRepository(Produto);
  const produto = await produtoRepository.findOneOrFail({
    where: {
      id: parseInt(id),
    },
    relations: ['imagens', 'ingredientes', 'lista_opcionais'],
  });
  return response.json(produtoView.render(produto));
}

/**
 * Cadastrada uma refeicao
 */
export async function criar_produto(request: Request, response: Response, next: NextFunction) {
  const { nome, preco, descricao, ativo, data_cadastro, data_modificacao_cadastro, ingredientes,
    quantidade, unidade_quantidade, tipo_produto, ingredientes_opcionais, empresa_id } = request.body;

  const produtoRepository = AppDataSource.getRepository(Produto);

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

  await valida_criacao_produto.validate(data, { abortEarly: false });
  const produto = produtoRepository.create(data);
  await produtoRepository.save(produto);

  return response.status(201).json(produto);
}

/**
 * Apaga uma refeicao, usando o id da mesma
 */
export async function apagar_produto(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const produtoRepository = AppDataSource.getRepository(Produto);
  const imagemRepository = AppDataSource.getRepository(Imagem);

  const imagem = await imagemRepository.find({
    where: {
      produtoId: parseInt(id),
    },
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
    await imagemRepository.delete(item.produtoId);
  })

  const produto = await produtoRepository.delete(id);

  return response.status(200).json(produto);
}

interface FotoType {
  id: number;
  url: string;
  nome: string;
}

/**
 * Atualiza os dados de uma refeicao, usando o id da mesma para busca-la no banco de dados
 */
export async function atualizar_produto(request: Request, response: Response, next: NextFunction) {
  const { id, nome, preco, descricao, ativo, imagens_removidas,
    quantidade, unidade_quantidade, tipo_produto } = request.body;
  const produtoRepository = AppDataSource.getRepository(Produto);

  /* Testar */
  let lista_imagens_removidas = (imagens_removidas as FotoType[]);
  const imagemRepository = AppDataSource.getRepository(Imagem);
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

  await valida_alualizacao_produto.validate(data, { abortEarly: false });
  const produto = await produtoRepository.update(id, data);

  return response.status(201).json(produto);
}
