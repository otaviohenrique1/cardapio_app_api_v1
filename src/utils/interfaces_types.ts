export interface AdministradorTypes {
  id: number;
  nome: string;
  codigo: string;
  email: string;
  senha: string;
  data_cadastro: Date;
  data_modificacao_cadastro: Date;
  // empresas: EmpresaTypes[];
}

export interface EmpresaTypes {
  id: number;
  nome: string;
  codigo: string;
  data_cadastro: Date;
  data_modificacao_cadastro: Date;
  email: string;
  senha: string;
  status_cadastro: boolean;
  // refeicoes: Refeicao[];
  administradorId: number;
  // clientes: Cliente[];
}

export interface ClienteTypes {
  id: number;
  codigo: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  data_cadastro: Date;
  data_modificacao_cadastro: Date;
  // pedidos: Pedido[];
  empresaId: number;
}

export interface RefeicaoTypes {
  id: number;
  nome: string;
  codigo: string;
  data_cadastro: Date;
  data_modificacao_cadastro: Date;
  preco: number;
  descricao: string;
  ativo: boolean; // 'ativo' => true, 'inativo' => false
  quantidade: number;
  unidade_quantidade: string; // unidade, ml, l, mg, g, kg
  tipo_produto: string; // ('comida' e 'bebida')
  // imagens: Imagem[];
  empresaId: number;
  // ingredientes: Ingrediente[];
  // lista_opcionais: PedidoOpcionalAdicionado[];
}

export interface PedidoRefeicaoTypes {
  id: number;
  refeicaoId: number;
  quantidade: number;
  pedidoId: number;
  // lista_opcionais: PedidoOpcionalAdicionado[];
  // lista_ingredientes_removidos: PedidoIngredienteRemovido[];
}

export interface PedidoOpcionalAdicionadoTypes {
  id: number;
  nome: string;
  preco: number;
  pedidoRefeicaoId: number;
  refeicaoId: number;
}

export interface PedidoIngredienteRemovidoTypes {
  id: number;
  nome: string;
  pedidoRefeicaoId: number;
}

export interface PedidoTypes {
  id: number;
  status_pedido: string;
  preco_total: number;
  codigo: string;
  data_cadastro: Date;
  data_modificacao_cadastro: Date;
  clienteId: number;
  // lista_refeicoes: PedidoRefeicao[];
}

export interface IngredienteTypes {
  id: number;
  nome: string;
  quantidade: number;
  unidade_quantidade: string;
  removivel: boolean;
  refeicaoId: number;
}

export interface ImagemTypes {
  id: number;
  path: string;
  refeicaoId: number;
}