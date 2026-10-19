# App Marketplace

Aplicativo mobile de **marketplace** desenvolvido com [Expo](https://expo.dev), React Native e um back-end em Python (FastAPI). No app, qualquer usuário pode **comprar** ou **vender** produtos: novos, em bom estado ou usados.

---

## Sobre o projeto

Este app funciona como uma vitrine digital completa e conectada a um banco de dados real. Qualquer pessoa cadastrada pode anunciar itens à venda, enviar fotos diretamente da câmera ou galeria, e navegar para comprar produtos anunciados por outros usuários ou lojas. O app possui um sistema de chat para que os usuários possam conversar e negociar entre si, através de mensagens ou propostas. Também é possível editar o seu perfil e destacar seus produtos, para que eles fiquem mais chamativos na vitrine.

### Funcionalidades principais

- **Cadastro e Login de usuários**, integrado ao banco de dados PostgreSQL com segurança.
- **Vitrine de produtos** (abas _Início_ / _Explorar_), listando os itens mais recentes da comunidade com preços e condições.
- **Anunciar, Editar e Excluir produtos**, permitindo que o usuário tire fotos na hora ou escolha da galeria.
- **Carrossel de Imagens**, com navegação fluida em anúncios com múltiplas fotos.
- **Mensagens**, para conversar sobre negociações e enviar propostas.
- **Perfil**, com os dados do usuário e acesso rápido à edição dos seus anúncios ativos.

---

## Prototipação

O design das interfaces e o protótipo navegável foram desenvolvidos no Figma.

- [Design no Figma](https://www.figma.com/design/0KaGnQjmMEkVNbxsQuAolW/AppMarketplace?node-id=0-1&t=VtZD229jX1uTdb3x-1)
- [Protótipo Interativo](https://www.figma.com/proto/0KaGnQjmMEkVNbxsQuAolW/AppMarketplace?node-id=1-12&p=f&t=wTJApl87X1FWtnNJ-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A12)

---

## Documentação e Diagramas

Abaixo estão os diagramas que ilustram a arquitetura e as principais interações do sistema:

**1. Diagrama de Casos de Uso**  
![Diagrama de Casos de Uso](/docs/DiagramaCasosDeUsoMarketplace2.png)

**2. Diagrama de Classes**  
![Nome do Diagrama 2](/docs/DiagramaDeClasses.png)

---

## Estrutura do projeto

O projeto evoluiu para uma aplicação **Full-Stack**, estruturada da seguinte forma:

```text
projeto-marketplace/
├── backend/                  # Servidor, API e Banco de Dados (Python)
│   ├── app/                  # Rotas (produtos.py, etc), db.py e main.py
│   ├── uploads/              # Imagens dos anúncios salvas localmente
│   └── venv/                 # Ambiente virtual do Python
│
├── src/                      # Front-end Mobile (Expo/React Native)
│   ├── app/                  # Telas do app (Início, Anunciar, Editar, Produto Detalhes)
│   ├── components/           # Componentes reutilizáveis (CabeçalhoAba, Botões, Cards)
│   └── lib/                  # Lógica de conexão (api.ts com IP dinâmico)
├── assets/                   # Imagens e ícones estáticos do app
└── package.json              # Dependências JavaScript
```

---

## Como importar e rodar o projeto

Como o projeto agora possui servidor e banco de dados, você precisará rodar o back-end e o front-end simultaneamente.

### Pré-requisitos

| Ferramenta        | Para que serve                                       |
| ----------------- | ---------------------------------------------------- |
| **Node.js** (LTS) | Rodar o `npm` e iniciar o aplicativo Expo            |
| **Python** (3.8+) | Rodar o servidor FastAPI do back-end                 |
| **PostgreSQL**    | Banco de dados onde anúncios e usuários ficam salvos |
| **Git**           | Baixar o projeto do repositório                      |
| **Expo Go**       | Testar o app diretamente no seu celular físico       |

### 1. Clonar o repositório

Abra o terminal e rode:

```bash
git clone https://github.com/JoseFernandoAvelino/projeto-marketplace.git
cd projeto-marketplace
```

### 2. Iniciar o Back-end (Servidor)

Abra um terminal, entre na pasta do back-end e ative o ambiente virtual:

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # No Windows
# source venv/bin/activate # No Mac/Linux
```

Instale as dependências e inicie o servidor:

```bash
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 3333
```

### 3. Iniciar o Front-end (Aplicativo)

Abra um **novo terminal** (mantenha o terminal do servidor aberto e rodando), volte para a pasta raiz do projeto e instale as bibliotecas mobile:

```bash
npm install
```

Inicie o aplicativo:

```bash
npx expo start
```

- **No celular (recomendado):** abra o app **Expo Go**, escaneie o QR code exibido no terminal. O seu celular e o computador precisam estar obrigatoriamente na **mesma rede Wi-Fi** para que as imagens e os produtos carreguem.

---

## Tecnologias utilizadas

**Front-end (Mobile):**

- [Expo](https://expo.dev) e [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev)
- [Tailwind CSS (NativeWind)](https://www.nativewind.dev/)
- [TypeScript](https://www.typescriptlang.org)

**Back-end:**

- [Python](https://www.python.org/) e [FastAPI](https://fastapi.tiangolo.com/)
- [PostgreSQL](https://www.postgresql.org/) + `psycopg` (Banco de dados relacional)
- [Uvicorn](https://www.uvicorn.org/)

---

## Autores

Projeto desenvolvido por:

- **José Fernando Avelino**
- **João Pedro de Holanda**
