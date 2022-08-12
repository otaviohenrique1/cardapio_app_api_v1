/* Porta */
export const PORT: number = 3333;

/* Host */
export const HOST = 'localhost';

/* Pasta uploads destino */
export const UPLOADS_PASTA = 'uploads';
export const FOTOS_PASTA = 'fotos';
export const URL_CAMINHO = `http://${HOST}:${PORT}/${UPLOADS_PASTA}/${FOTOS_PASTA}/`

/* Formatos de data e hora */
export const FORMATO_HORA_1 = 'HH:mm';
export const FORMATO_HORA_2 = 'HH:mm:ss';
export const FORMATO_DATA_1 = 'dd/MM/yyyy';
export const FORMATO_DATA_2 = 'yyyy-MM-dd';
export const FORMATO_DATA_COM_HORA_1 = 'yyyy-MM-dd HH:mm';
export const FORMATO_DATA_COM_HORA_2 = 'dd/MM/yyyy HH:mm';
export const FORMATO_DATA_COM_HORA_3 = 'yyyy-MM-dd HH:mm:ss';
export const FORMATO_DATA_COM_HORA_4 = 'dd/MM/yyyy HH:mm:ss';

/* Mensagem de validacao */
export const EMAIL_INVALIDO = 'Email invalido';
export const USUARIO_INVALIDO = 'Usuario invalido';
export const SENHA_INVALIDO = 'Senha invalido';
export const LOGIN_INVALIDO = 'Login invalido';
export const LOGADO_COM_SUCESSO = 'Logado com sucesso!';
export const valor_minimo_carateres = 8;
export const MINIMO_CARACTERES = `Minimo ${valor_minimo_carateres} carateres`;
export const valor_maximo_carateres = 255;
export const MAXIMO_CARACTERES = `Maximo ${valor_maximo_carateres} carateres`;
export const valor_minimo_ingredientes = 1;
export const MINIMO_INGREDIENTES = `Minimo ${valor_minimo_ingredientes} carateres`;
