import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
// import passport from "passport";
// import { Strategy } from "passport-local";
// import { compareSync } from "bcrypt";
import { Cliente } from "../entity/Cliente";
import clienteView from "../views/ClienteView";
import { EMAIL_INVALIDO, LOGADO_COM_SUCESSO, LOGIN_INVALIDO, SENHA_INVALIDO, USUARIO_INVALIDO } from "../utils/constantes";
import { valida_alualizacao_cliente, valida_criacao_cliente } from "../utils/SchemasValidacao";

// export async function login2_cliente(request: Request, response: Response, next: NextFunction) {
//   const { email, senha } = request.body;

//   passport.use(new Strategy({
//     usernameField: email,
//     passwordField: senha
//   }, async function verify(email, senha, done) {
//     const clienteRepository = getRepository(Cliente);
//     const cliente = await clienteRepository.findOne({ email: email });
//     try {
//       if (!cliente) return done(null, false, { message: USUARIO_INVALIDO});

//       const isValid = compareSync(senha, cliente.senha);

//       if (!isValid) return done(null, false, { message: SENHA_INVALIDO});

//       return done(null, cliente);
//     } catch (error) {
//       done(error, false)
//     }
//   }));
// },

/* Arrumar - Refatorar */
export async function login_cliente(request: Request, response: Response, next: NextFunction) {
  const { email, senha } = request.body;

  let existingUser: any;
  const clienteRepository = getRepository(Cliente);

  try {
    existingUser = await clienteRepository.findOne({ email: request.body.email });
  } catch (error) {
    return response.status(500).json({ 
      message: LOGIN_INVALIDO,
      error: error
    });
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
 * Listar todas os clientes cadastrados
 */
export async function listar_clientes(request: Request, response: Response, next: NextFunction) {
  const clienteRepository = getRepository(Cliente);
  const { id } = request.params;
  const cliente = await clienteRepository.find({
    where: { empresaId: id },
  });
  return response.json(cliente);
}

/**
 * Busca um cliente cadastrado usando o id do mesmo e exibe os seus dados
 */
export async function busca_cliente(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;
  const clienteRepository = getRepository(Cliente);
  const cliente = await clienteRepository.findOneOrFail(id, { relations: ['pedidos'] });
  return response.json(clienteView.render(cliente));
}

/**
 * Cadastra um cliente
 */
/* Arrumar - Refatorar */
export async function criar_cliente(request: Request, response: Response, next: NextFunction) {
  // const { nome, email, senha, rua, numero, bairro, cidade, estado, cep,
  //   telefone, data_cadastro, data_modificacao_cadastro } = request.body;
  // const data = {
  //   nome, email, senha, rua, numero, bairro, cidade, estado,
  //   cep, telefone, data_cadastro, data_modificacao_cadastro
  // };
  
  const clienteRepository = getRepository(Cliente);
  await valida_criacao_cliente.validate({
    nome: request.body.nome,
    email: request.body.email,
    senha: request.body.senha,
    rua: request.body.rua,
    numero: request.body.numero,
    bairro: request.body.bairro,
    cidade: request.body.cidade,
    estado: request.body.estado,
    cep: request.body.cep,
    telefone: request.body.telefone,
    data_cadastro: request.body.data_cadastro,
    data_modificacao_cadastro: request.body.data_modificacao_cadastro,
    empresaId: request.body.empresaId,
  }, { abortEarly: false });

  const cliente = clienteRepository.create({
    nome: request.body.nome,
    email: request.body.email,
    senha: request.body.senha,
    rua: request.body.rua,
    numero: request.body.numero,
    bairro: request.body.bairro,
    cidade: request.body.cidade,
    estado: request.body.estado,
    cep: request.body.cep,
    telefone: request.body.telefone,
    data_cadastro: request.body.data_cadastro,
    data_modificacao_cadastro: request.body.data_modificacao_cadastro,
    empresaId: request.body.empresaId,
  });
  await clienteRepository.save(cliente);

  return response.status(201).json(cliente);
}

/**
 * Atualiza os dados de um cliente, usando o id do mesmo para busca-lo no banco de dados
 */
export async function atualizar_cliente(request: Request, response: Response, next: NextFunction) {
  const { id, nome, data_modificacao_cadastro, rua, numero, bairro,
    cidade, estado, cep, telefone, email, senha } = request.body;

  const clienteRepository = getRepository(Cliente);

  const data = {
    nome, data_modificacao_cadastro, rua, numero,
    bairro, cidade, estado, cep, telefone, email, senha
  };

  await valida_alualizacao_cliente.validate(data, { abortEarly: false });
  const cliente = await clienteRepository.update(id, data);

  return response.status(201).json(cliente);
}

// export default {
//   // async login2(request: Request, response: Response, next: NextFunction) {
//   //   const { email, senha } = request.body;

//   //   passport.use(new Strategy({
//   //     usernameField: email,
//   //     passwordField: senha
//   //   }, async function verify(email, senha, done) {
//   //     const clienteRepository = getRepository(Cliente);
//   //     const cliente = await clienteRepository.findOne({ email: email });
//   //     try {
//   //       if (!cliente) return done(null, false, { message: USUARIO_INVALIDO});

//   //       const isValid = compareSync(senha, cliente.senha);

//   //       if (!isValid) return done(null, false, { message: SENHA_INVALIDO});

//   //       return done(null, cliente);
//   //     } catch (error) {
//   //       done(error, false)
//   //     }
//   //   }));
//   // },
//   async login(request: Request, response: Response, next: NextFunction) {
//     const { email, senha } = request.body;
//     let existingUser: any;
//     const clienteRepository = getRepository(Cliente);

//     try {
//       existingUser = await clienteRepository
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
//    * Listar todas os clientes cadastrados
//    */
//   async index(request: Request, response: Response, next: NextFunction) {
//     const clienteRepository = getRepository(Cliente);
//     const cliente = await clienteRepository.find();
//     return response.json(cliente);
//   },
//   /**
//    * Busca um cliente cadastrado usando o id do mesmo e exibe os seus dados
//    */
//   async show(request: Request, response: Response, next: NextFunction) {
//     const { id } = request.params;
//     const clienteRepository = getRepository(Cliente);
//     const cliente = await clienteRepository.findOneOrFail(id, { relations: ['pedidos'] });
//     return response.json(clienteView.render(cliente));
//   },
//   /**
//    * Cadastra um cliente
//    */
//   async create(request: Request, response: Response, next: NextFunction) {
//     const { nome, email, senha, rua, numero, bairro, cidade, estado, cep,
//       telefone, data_cadastro, data_modificacao_cadastro } = request.body;
//     const clienteRepository = getRepository(Cliente);
//     const data = {
//       nome, email, senha, rua, numero, bairro, cidade, estado,
//       cep, telefone, data_cadastro, data_modificacao_cadastro
//     };

//     await valida_criacao_cliente.validate(data, { abortEarly: false });
//     const cliente = clienteRepository.create(data);
//     await clienteRepository.save(cliente);

//     return response.status(201).json(cliente);
//   },
//   /**
//    * Atualiza os dados de um cliente, usando o id do mesmo para busca-lo no banco de dados
//    */
//   async update(request: Request, response: Response, next: NextFunction) {
//     const { id, nome, data_modificacao_cadastro, rua, numero, bairro,
//       cidade, estado, cep, telefone, email, senha } = request.body;

//     const clienteRepository = getRepository(Cliente);

//     const data = {
//       nome, data_modificacao_cadastro, rua, numero,
//       bairro, cidade, estado, cep, telefone, email, senha
//     };

//     await valida_alualizacao_cliente.validate(data, { abortEarly: false });
//     const cliente = await clienteRepository.update(id, data);

//     return response.status(201).json(cliente);
//   },
// };
