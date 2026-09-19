# 🛍️ Marketplace App

Aplicativo mobile de **marketplace** desenvolvido com [Expo](https://expo.dev) e React Native, onde qualquer usuário pode **comprar** ou **vender** produtos: novos, seminovos ou usados em bom estado. Tudo isso em um só lugar.

---

## 📖 Sobre o projeto

Este app funciona como uma vitrine digital compartilhada: qualquer pessoa cadastrada pode anunciar itens à venda e, ao mesmo tempo, navegar e comprar produtos anunciados por outros usuários. 

### Funcionalidades principais

- **Cadastro de usuários**, com Nome, CPF, E-mail e Senha — qualquer usuário pode tanto comprar quanto anunciar produtos.
- **Login** com validação de e-mail e senha.
- **Vitrine de produtos** (aba *Home*), com nome, preço e condição do item (novo, seminovo, usado).
- **Anunciar produto** (aba *Anunciar*), para o usuário colocar seus próprios itens à venda.
- **Mensagens** (aba *Mensagens*), para conversar sobre negociações.
- **Perfil** (aba *Perfil*), com os dados do usuário logado.
- **Detalhes do produto**, com uma tela dedicada para cada anúncio.

> ⚠️ **Nota sobre o estágio atual do projeto:** por enquanto, os dados de cadastro e produtos ficam guardados apenas na memória do próprio app, ainda não há conexão com banco de dados.

---

## 🗂️ Estrutura do projeto

```
projeto-marketplace/
├── src/
│   ├── app/                  # Telas do app (roteamento baseado em arquivos - Expo Router)
│   │   ├── index.tsx         # Tela de Login
│   │   ├── cadastro.tsx      # Tela de Cadastro do usuário
│   │   ├── produto/[id].tsx  # Detalhes de um produto
│   │   └── (tabs)/           # Navegação em abas (após login)
│   │       ├── home.tsx      # Vitrine de produtos
│   │       ├── anunciar.tsx  # Anunciar um novo produto
│   │       ├── mensagens.tsx # Mensagens/conversas
│   │       └── perfil.tsx    # Perfil do usuário
│   ├── components/           # Componentes reutilizáveis de UI
│   ├── constants/            # Cores, temas e valores fixos
│   ├── hooks/                 # Hooks customizados (ex: tema claro/escuro)
│   └── lib/
│       └── auth-store.ts     # Lógica de cadastro/login (validações e "banco" em memória)
├── assets/                   # Imagens e ícones
├── app.json                  # Configurações do Expo
└── package.json              # Dependências e scripts do projeto
```

---

## 🚀 Como importar e rodar o projeto

Siga os passos abaixo para baixar o projeto do GitHub e rodá-lo na sua máquina.

### Pré-requisitos

Antes de começar, você precisa ter instalado:

| Ferramenta | Para que serve | Link |
|---|---|---|
| **Node.js** (LTS) | Rodar o `npm` e o JavaScript do projeto | https://nodejs.org |
| **Git** | Baixar (clonar) o projeto do GitHub | https://git-scm.com/downloads |
| **Expo Go** (no celular) | Testar o app no seu celular físico | Play Store / App Store |

Para conferir se Node e Git já estão instalados, rode no terminal:

```bash
node -v
git --version
```

### 1. Clonar o repositório

Abra o terminal na pasta onde deseja salvar o projeto e rode:

```bash
git clone https://github.com/JoseFernandoAvelino/projeto-marketplace.git
```

Depois, entre na pasta criada:

```bash
cd projeto-marketplace
```

### 2. Instalar as dependências

```bash
npm install
```

Esse comando baixa todas as bibliotecas que o projeto usa (React, Expo, etc.) e cria a pasta `node_modules`. Pode levar alguns minutos.

### 3. Iniciar o aplicativo

```bash
npx expo start
```

Isso abre o **Metro Bundler**, com um QR code no terminal e algumas opções de execução.

### 4. Abrir o app

Com o servidor rodando, você pode visualizar o app de várias formas:

- **📱 Celular (recomendado):** abra o app **Expo Go** e escaneie o QR code exibido no terminal. O celular precisa estar na mesma rede Wi-Fi do computador.
- **🤖 Emulador Android:** pressione `a` (requer Android Studio configurado).

---

## 🧩 Tecnologias utilizadas

- [Expo](https://expo.dev) — framework para desenvolvimento React Native
- [Expo Router](https://docs.expo.dev/router/introduction/) — roteamento baseado em arquivos
- [React Native](https://reactnative.dev)
- [TypeScript](https://www.typescriptlang.org)

---
