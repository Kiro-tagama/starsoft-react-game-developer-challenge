# Jogo de Slot Machine - Jogo Web

## Objetivo

Este projeto é um protótipo de um **Jogo de Slot Machine** desenvolvido para a web utilizando **React**, **TypeScript** e a game library **Matter.js**. O objetivo é demonstrar habilidades em desenvolvimento de jogos, proporcionando uma experiência de usuário envolvente e interações suaves.

## Tecnologias

- **React** – Framework para construção da interface de usuário.
- **TypeScript** – Adiciona tipagem estática ao código para uma melhor experiência de desenvolvimento.
- **Redux** – Gerenciamento de estado global da aplicação.
- **Matter.js** – Biblioteca de física para criar simulações realistas.
- **Tailwind CSS** – Para estilização utilizando classes utilitárias.
- **ESLint & Prettier** – Para manter a qualidade e consistência do código.
- **Cypress** – Para testes E2E automatizados.

## Configuração do Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Kiro-tagama/starsoft-react-game-developer-challenge.git
   cd starsoft-react-game-developer-challenge
   ```

2. Start
   ```bash
   npm install
   npm run dev
   ```
3. Test E2E
   ```bash
   npx cypress run # sem interface visual
   # or
   npx cypress open
   ```

### Estrutura de Arquivos

Criado com vite

- `cypress/` - Testes E2E automatizados.
- `public/` - Arquivos estáticos e assets.
- `src/` - Contém o código fonte da aplicação.

  - `hooks/` - Hooks personalizados e a lógica do game.
  - `interfaces/` - Definições de interfaces TypeScript.
  - `pages/` - Contém as telas do jogo, como Game, Home e NotFound.
  - `store/` - Gerenciamento de estado com Redux.
  - `styles/` - Arquivos de estilização com Tailwind CSS.

- `./` - Na raiz temos os arquivos de configuração do projeto como cypress,eslint,prettie,vite e etc.

## Notas pessoais

Na tela inicial temos um "login" bem simples só para usar que está salvo no redux
No jogo em sim a mecanica se do matter se baseia em gravidade e tempo (a opção turbo regula o tempo de 5s para 1s)
