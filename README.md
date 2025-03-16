# Jogo de Slot Machine - Jogo Web

## Objetivo

Este projeto é um protótipo de um **Jogo de Slot Machine** desenvolvido para a web utilizando **React**, **TypeScript** e a game library **Matter.js**. O objetivo é demonstrar habilidades em desenvolvimento de jogos, proporcionando uma experiência de usuário envolvente e interações suaves.

**Fluxo**
Ao entrar no jogo, o usuário realiza um "login", inserindo um nome e uma senha (simulando um sistema de autenticação). Em seguida, define um valor para sua carteira, que será utilizado para realizar as apostas.

O jogo conta com seis botões, organizados da seguinte forma:

1. Turbo – Reduz o tempo de rotação da roleta.
2. Reduzir aposta – Diminui o valor da aposta atual.
3. Jogar/Start – Inicia uma rodada.
4. Aumentar aposta – Eleva o valor da aposta atual.
5. Automático – Mantém o jogo rodando continuamente até ser desativado.
6. Menu – Acessa as regras do jogo, histórico de apostas e a opção de voltar para a tela anterior.

**Regras do Jogo**

- O Coringa retorna 100% do valor apostado.
- Os demais ícones retornam 50% do valor apostado.
- O multiplicador é resetado ao ganhar e multiplica o valor apostado com base no multiplicador atual.

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

  - `game/` - Hooks personalizados e a lógica do game.
  - `hooks/` - Hooks personalizados para reunir a logica do game.
  - `interfaces/` - Definições de interfaces TypeScript.
  - `pages/` - Contém as telas do jogo, como Game, Home e NotFound.
  - `store/` - Gerenciamento de estado com Redux.
  - `styles/` - Arquivos de estilização com Tailwind CSS.

- `./` - Na raiz temos os arquivos de configuração do projeto como cypress,eslint,prettie,vite e etc.

## Notas

Na tela inicial, há um "login" simples, utilizado apenas para iniciar o jogo, com os dados armazenados no Redux.

No jogo, a mecânica é baseada no Matter.js, escolhido por sua documentação robusta. A física do jogo utiliza gravidade e tempo para simular a rolagem de um caça-níquel. A opção Turbo reduz o tempo de rotação da roleta de 5s para 1s.

**Melhorias Futuras**
Atualmente, a vitória ocorre de forma totalmente aleatória, apenas posicionando os ícones. No futuro, pode-se implementar um sistema que defina ícones específicos após um determinado número de rodadas ou tempo, em vez de depender exclusivamente da aleatoriedade. Além disso, como não há um controle direto sobre a porcentagem de ganho, seria interessante ajustar essa mecânica para oferecer probabilidades mais balanceadas e proporcionar uma experiência de jogo mais equilibrada.

Melhorias na interface e na performance também são bem-vindas. Algumas possíveis otimizações incluem:

- Revisar a responsividade para garantir uma melhor adaptação a diferentes telas.
- Substituir imagens por SVGs para melhorar a qualidade e a performance.
- Ajustar o background na versão desktop, já que ele foi removido por não se adequar corretamente, pois o mockup foi pensado para dispositivos móveis.
- Refinar detalhes da UI para aprimorar a experiência do usuário.
