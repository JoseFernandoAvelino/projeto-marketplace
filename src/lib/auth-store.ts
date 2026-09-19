export interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

const USUARIOS: Usuario[] = [];

export function emailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function emailJaCadastrado(email: string): boolean {
  const alvo = email.trim().toLowerCase();
  return USUARIOS.some((usuario) => usuario.email.toLowerCase() === alvo);
}

export function cadastrarUsuario(dados: Usuario): void {
  const nome = dados.nome.trim();
  const email = dados.email.trim();
  const senha = dados.senha;

  if (!nome) throw new Error("Informe seu nome.");
  if (!emailValido(email)) throw new Error("Informe um e-mail válido.");
  if (senha.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }
  if (emailJaCadastrado(email)) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  USUARIOS.push({ nome, email, senha });
}

export function validarLogin(email: string, senha: string): Usuario {
  const alvo = email.trim().toLowerCase();
  const usuario = USUARIOS.find((u) => u.email.toLowerCase() === alvo);

  if (!usuario || usuario.senha !== senha) {
    throw new Error("E-mail ou senha incorretos.");
  }

  return usuario;
}