# Gerenciador de Livros

Frontend Angular para gerenciamento de livros, autores e assuntos.

## Backend

Repositorio do backend:

- https://github.com/Rayldon/gerenciadordelivros

## Setup

```bash
npm install
npm start
```

Abre em `http://localhost:4200`.

## O que tem

A aplicacao possui as secoes:

- **Livros**: listagem paginada, criacao, edicao e exclusao.
- **Autores**: listagem, criacao, edicao e exclusao.
- **Assuntos**: listagem, criacao, edicao e exclusao.
- **Relatorio**: exportacao PDF de autores.

Tudo usa Reactive Forms com validacoes e interface Bootstrap.

## Tech Stack

- Angular 21 (Standalone Components)
- TypeScript strict
- NgRx para state management
- Http Client
- Reactive Forms
- Bootstrap 5

## Estrutura

```text
src/app/
|-- core/
|   |-- models/        # Interfaces
|   |-- services/      # HTTP
|   |-- interceptors/  # Error handling
|   `-- utils/
|-- features/
|   |-- livros/
|   |-- autores/
|   |-- assuntos/
|   `-- relatorios/
`-- environments/
```

Cada feature tem seus componentes e store NgRx com actions, reducers, selectors e effects.

## API

Por padrao chamada em `http://localhost:8080`. Endpoints usados pelo frontend:

### Livros

- `GET /livros?page=0&size=10`
- `POST /livros`
- `PUT /livros/{id}`
- `DELETE /livros/{id}`

### Autores

- `GET /autores`
- `POST /autores`
- `PUT /autores/{id}`
- `DELETE /autores/{id}`

### Assuntos

- `GET /assuntos`
- `POST /assuntos`
- `PUT /assuntos/{id}`
- `DELETE /assuntos/{id}`

### Relatorios

- `GET /relatorios/autores` (PDF)

Para mudar a URL da API, edite `src/app/environments/environment.ts`.

## Build

```bash
npm run build
```

## Validacoes

- Livro: titulo e valor obrigatorios, minimo 1 autor e 1 assunto
- Autor: nome obrigatorio
- Assunto: descricao obrigatoria

Erros da API sao exibidos em alerts na tela.
