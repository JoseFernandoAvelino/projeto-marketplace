export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

let usuarioLogado: Usuario | null = null;

export function entrar(usuario: Usuario) {
  usuarioLogado = usuario;
}

export function sair() {
  usuarioLogado = null;
}

export function usuarioAtual() {
  return usuarioLogado;
}