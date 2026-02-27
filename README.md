# Gerenciador de Livros

Frontend Angular para gerenciamento de livros, autores e assuntos.

## Setup

```bash
npm install
npm start
```

Abre em `http://localhost:4200`

## O que tem

A aplicação é bem simples. Três seções:

- **Livros**: Lista e criação de livros. Cada livro precisa de título, valor, pelo menos um autor e um assunto. Usa FormArray pra gerenciar os arrays dinamicamente.
- **Autores**: Lista e criação com nome.
- **Assuntos**: Lista e criação com descrição.

Tudo usa Reactive Forms com validações e a interface é Bootstrap.

## Tech Stack

- Angular 21 (Standalone Components)
- TypeScript strict
- NgRx para state management
- Http Client
- Reactive Forms
- Bootstrap 5

## Estrutura

```
src/app/
├── core/
│   ├── models/      # Interfaces
│   ├── services/    # HTTP
│   └── interceptors/  # Error handling
├── features/
│   ├── livros/
│   ├── autores/
│   └── assuntos/
└── environments/
```

Cada feature tem seus componentes e store NgRx com actions, reducers, selectors e effects.

## API

Por padrão chamada em `http://localhost:8080`. Os endpoints esperados:

- `GET /livros`, `POST /livros`
- `GET /autores`, `POST /autores`
- `GET /assuntos`, `POST /assuntos`

Pra mudar a URL, edita `src/app/environments/environment.ts`

## Build

```bash
npm run build
```

## Validações

- Livro: título e valor obrigatórios, mínimo 1 autor e 1 assunto
- Autor: nome obrigatório
- Assunto: descrição obrigatória

Erros da API são exibidos em alerts na tela.
