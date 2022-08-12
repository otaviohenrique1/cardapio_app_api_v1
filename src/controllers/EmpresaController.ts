import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import Empresa from "../entity/Empresa";
import empresaView from "../views/EmpresaView";
import { EMAIL_INVALIDO, LOGADO_COM_SUCESSO, LOGIN_INVALIDO, SENHA_INVALIDO, USUARIO_INVALIDO } from "../utils/constantes";
import { valida_atualizacao_empresa, valida_criacao_empresa as valida_criacao_empresa } from "../utils/SchemasValidacao";

/**
 * Busca e valida o login do usuario
 */
export async function login_empresa(request: Request, response: Response, next: NextFunction) {
  const { email, senha } = request.body;
  let existingUser: any;
  const empresaRepository = getRepository(Empresa);

  try {
    existingUser = await empresaRepository.findOne({ email: email });
  } catch (error) {
    return response.status(500).json({ message: LOGIN_INVALIDO });
  }

  if (!existingUser) {
    return response.status(401).json({ message: USUARIO_INVALIDO });
  } else if (existingUser.senha !== senha) {
    return response.status(401).json({ message: SENHA_INVALIDO });
  } else if (existingUser.email !== email) {
    return response.status(401).json({ message: EMAIL_INVALIDO });
  }

  let data_user = {
    id: existingUser.id,
    nome: existingUser.nome,
    email: existingUser.email,
    codigo: existingUser.codigo,
  };

  return response.status(200).json({ message: LOGADO_COM_SUCESSO, data_user });
}

/**
 * Listar todas os usuarios cadastrados
 */
export async function listar_empresas(request: Request, response: Response, next: NextFunction) {
  const empresaRepository = getRepository(Empresa);
  const empresa = await empresaRepository.find();
  return response.json(empresa);
}

/**
 * Busca um usuario cadastrado usando o id do mesmo e exibe os seus dados
 */
export async function buscar_empresa(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const empresaRepository = getRepository(Empresa);
  const empresa = await empresaRepository.findOneOrFail(id, { where: { id: id } });
  return response.json(empresaView.render(empresa));
}

/**
 * Cadastra um usuario
 */
export async function criar_empresa(request: Request, response: Response, next: NextFunction) {
  const { nome, email, senha, status_cadastro, data_cadastro, data_modificacao_cadastro, administradorId } = request.body;
  const empresaRepository = getRepository(Empresa);
  const data = { nome, email, senha, status_cadastro, data_cadastro, data_modificacao_cadastro, administradorId };

  await valida_criacao_empresa.validate(data, { abortEarly: false });
  const empresa = empresaRepository.create(data);
  await empresaRepository.save(empresa);

  return response.status(201).json(empresa);
}

/**
 * Atualiza os dados de um usuario, usando o id do mesmo para busca-lo no banco de dados
 */
export async function atualizar_empresa(request: Request, response: Response, next: NextFunction) {
  const { id, nome, email, senha, status_cadastro, data_modificacao_cadastro } = request.body;
  const empresaRepository = getRepository(Empresa);
  const data = { nome, email, senha, status_cadastro, data_modificacao_cadastro };

  await valida_atualizacao_empresa.validate(data, { abortEarly: false });
  const usuario = await empresaRepository.update(id, data);

  return response.status(201).json(usuario);
}

// import { NextFunction, Request, Response } from "express";
// import { getRepository } from "typeorm";
// import Usuario from "../entity/Usuario";
// import usuarioView from "../views/UsuarioView";
// import { EMAIL_INVALIDO, LOGADO_COM_SUCESSO, LOGIN_INVALIDO, SENHA_INVALIDO, USUARIO_INVALIDO } from "../utils/constantes";
// import { valida_alualizacao_usuario, valida_criacao_usuario } from "../utils/SchemasValidacao";

// export default {
//   /**
//    * Busca e valida o login do usuario
//    */
//   async login_usuario(request: Request, response: Response, next: NextFunction) {
//     const { email, senha } = request.body;
//     let existingUser: any;
//     const usuarioRepository = getRepository(Usuario);

//     try {
//       existingUser = await usuarioRepository
//         .findOne({ email: email });
//     } catch (error) {
//       return response
//         .status(500)
//         .json({ message: LOGIN_INVALIDO });
//     }

//     if (!existingUser) {
//       return response
//         .status(401)
//         .json({ message: USUARIO_INVALIDO });
//     } else if (existingUser.senha !== senha) {
//       return response
//         .status(401)
//         .json({ message: SENHA_INVALIDO });
//     } else if (existingUser.email !== email) {
//       return response
//         .status(401)
//         .json({ message: EMAIL_INVALIDO });
//     }

//     let data_user = {
//       id: existingUser.id,
//       nome: existingUser.nome,
//       email: existingUser.email,
//       codigo: existingUser.codigo,
//     };

//     return response.status(200).json({ message: LOGADO_COM_SUCESSO, data_user });
//   },
//   /**
//    * Listar todas os usuarios cadastrados
//    */
//   async listar_usuario(request: Request, response: Response, next: NextFunction) {
//     const usuarioRepository = getRepository(Usuario);
//     const usuario = await usuarioRepository.find();
//     return response.json(usuario);
//   },
//   /**
//    * Busca um usuario cadastrado usando o id do mesmo e exibe os seus dados
//    */
//   async buscar_usuario(request: Request, response: Response, next: NextFunction) {
//     const { id } = request.params;
//     const usuarioRepository = getRepository(Usuario);
//     const usuario = await usuarioRepository.findOneOrFail(id, { where: { id: id } });
//     return response.json(usuarioView.render(usuario));
//   },
//   /**
//    * Cadastra um usuario
//    */
//   async criar_usuario(request: Request, response: Response, next: NextFunction) {
//     const { nome, email, senha, data_cadastro, data_modificacao_cadastro } = request.body;
//     const usuarioRepository = getRepository(Usuario);
//     const data = { nome, email, senha, data_cadastro, data_modificacao_cadastro };

//     await valida_criacao_usuario.validate(data, { abortEarly: false });
//     const usuario = usuarioRepository.create(data);
//     await usuarioRepository.save(usuario);

//     return response.status(201).json(usuario);
//   },
//   /**
//    * Atualiza os dados de um usuario, usando o id do mesmo para busca-lo no banco de dados
//    */
//   async atualizar_usuario(request: Request, response: Response, next: NextFunction) {
//     const { id, nome, email, senha, data_modificacao_cadastro } = request.body;
//     const usuarioRepository = getRepository(Usuario);
//     const data = { nome, email, senha, data_modificacao_cadastro };

//     await valida_alualizacao_usuario.validate(data, { abortEarly: false });
//     const usuario = await usuarioRepository.update(id, data);

//     return response.status(201).json(usuario);
//   },
// };
