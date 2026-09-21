# Marketplace App

Aplicativo mobile de **marketplace** desenvolvido com [Expo](https://expo.dev) e React Native, onde qualquer usuário pode **comprar** ou **vender** produtos: novos, seminovos ou usados em bom estado.

---

## Sobre o projeto

Este app funciona como uma vitrine digital: qualquer pessoa cadastrada pode anunciar itens à venda ou navegar para comprar produtos anunciados por outros usuários.

### Funcionalidades principais

- **Cadastro de usuários**, com Nome, CPF, E-mail e Senha — qualquer usuário pode tanto comprar quanto anunciar produtos.
- **Login** com validação de e-mail e senha.
- **Vitrine de produtos** (aba _Home_), com nome, preço e condição do item.
- **Anunciar produto** (aba _Anunciar_), para o usuário colocar seus próprios itens à venda.
- **Mensagens** (aba _Mensagens_), para conversar sobre negociações.
- **Perfil** (aba _Perfil_), com os dados do usuário logado.
- **Detalhes do produto**, com uma tela dedicada para cada anúncio.

---

## Prototipação

O design das interfaces e o protótipo navegável foram desenvolvidos no Figma.

- [Design no Figma](https://www.figma.com/design/0KaGnQjmMEkVNbxsQuAolW/AppMarketplace?node-id=0-1&t=VtZD229jX1uTdb3x-1)
- [Protótipo Interativo](https://www.figma.com/proto/0KaGnQjmMEkVNbxsQuAolW/AppMarketplace?node-id=1-12&p=f&t=wTJApl87X1FWtnNJ-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A12)

---

## Documentação

Abaixo se encontra o Diagrama de Casos de Uso, que ilustra as principais interações dos utilizadores com as funcionalidades do sistema:

![Diagrama de Casos de Uso](/docs/diagrama_de_casos_uso.jpeg)

---

## Estrutura do projeto

```
projeto-marketplace/
├── src/
│   ├── app/                  # Telas do app
│   │   ├── index.tsx         # Tela de Login
│   │   ├── cadastro.tsx      # Tela de Cadastro
│   │   ├── produto/[id].tsx  # Detalhes de um produto
│   │   └── (tabs)/           # Navegação em abas
│   │       ├── home.tsx      # Vitrine de produtos
│   │       ├── anunciar.tsx  # Anunciar um novo produto
│   │       ├── mensagens.tsx # Mensagens/conversas
│   │       └── perfil.tsx    # Perfil do usuário
│   ├── components/           # Componentes reutilizáveis de UI
│   ├── constants/            # Cores, temas e valores fixos
│   ├── hooks/                 # Hooks customizados
│   └── lib/
│       └── auth-store.ts     # Lógica de cadastro/login (validações e "banco" em memória)
├── assets/                   # Imagens e ícones
├── app.json                  # Configurações do Expo
└── package.json              # Dependências e scripts do projeto
```

---

## Como importar e rodar o projeto

Siga os passos abaixo para baixar o projeto do GitHub e rodá-lo na sua máquina.

### Pré-requisitos

Antes de começar, você precisa ter instalado:

| Ferramenta               | Para que serve                          | Link                          |
| ------------------------ | --------------------------------------- | ----------------------------- |
| **Node.js** (LTS)        | Rodar o `npm` e o JavaScript do projeto | https://nodejs.org            |
| **Git**                  | Baixar (clonar) o projeto do GitHub     | https://git-scm.com/downloads |
| **Expo Go** (no celular) | Testar o app no seu celular físico      | Play Store / App Store        |

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

- **Celular (recomendado):** abra o app **Expo Go** e escaneie o QR code exibido no terminal. O celular precisa estar na mesma rede Wi-Fi do computador.
- **Emulador Android:** pressione `a` (requer Android Studio configurado).

---

## Tecnologias utilizadas

- [Expo](https://expo.dev)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev)
- [TypeScript](https://www.typescriptlang.org)
- [NativeWind](https://www.nativewind.dev)

---

## Autores

Projeto desenvolvido por:

- **José Fernando Avelino**
- **João Pedro de Holanda**
