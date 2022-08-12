import "reflect-metadata"
import { DataSource } from "typeorm"
import { Administrador } from "../entity/Administrador"
import { Cliente } from "../entity/Cliente"
import { Empresa } from "../entity/Empresa"
import { Imagem } from "../entity/Imagem"
import { Ingrediente } from "../entity/Ingrediente"
import { IngredienteOpcional } from "../entity/IngredienteOpcional"
import { IngredienteRemovido } from "../entity/IngredienteRemovido"
import { ItemPedido } from "../entity/ItemPedido"
import { Pedido } from "../entity/Pedido"
import { Produto } from "../entity/Produto"
import { createAdministradores1660324600156 } from "../migration/1660324600156-create_administradores"
import { createEmpresas1660324601534 } from "../migration/1660324601534-create_empresas"
import { createClientes1660324602912 } from "../migration/1660324602912-create_clientes"
import { createProdutos1660324604254 } from "../migration/1660324604254-create_produtos"
import { createImagens1660324605637 } from "../migration/1660324605637-create_imagens"
import { createIngredientes1660324607226 } from "../migration/1660324607226-create_ingredientes"
import { createPedidos1660324608777 } from "../migration/1660324608777-create_pedidos"
import { createItensPedido1660324610305 } from "../migration/1660324610305-create_itens_pedido"
import { createIngredientesRemovidos1660324611752 } from "../migration/1660324611752-create_ingredientes_removidos"
import { createIngredientesOpcionais1660324613533 } from "../migration/1660324613533-create_ingredientes_opcionais"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "cardapio_app_api",
  synchronize: true,
  // synchronize: true /* AVISO => A configuração synchronize: true não deve ser usada na produção - caso contrário, você poderá perder dados de produção. */,
  logging: false,
  entities: [
    Administrador,
    Empresa,
    Cliente,
    Produto,
    Imagem,
    Ingrediente,
    IngredienteOpcional,
    IngredienteRemovido,
    Pedido,
    ItemPedido,
  ],
  migrations: [
    createAdministradores1660324600156,
    createEmpresas1660324601534,
    createClientes1660324602912,
    createProdutos1660324604254,
    createImagens1660324605637,
    createIngredientes1660324607226,
    createIngredientesOpcionais1660324613533,
    createIngredientesRemovidos1660324611752,
    createPedidos1660324608777,
    createItensPedido1660324610305,
  ],
  subscribers: [],
});
