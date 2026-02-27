import { createReducer, on } from '@ngrx/store';
import * as LivroActions from './livro.actions';
import { LivroState, initialState } from './livro.selectors';

export const livroReducer = createReducer(
  initialState,
  on(LivroActions.loadLivros, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LivroActions.loadLivrosSuccess, (state, { livros }) => ({
    ...state,
    livros,
    loading: false,
    error: null,
  })),
  on(LivroActions.loadLivrosError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(LivroActions.createLivro, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LivroActions.createLivroSuccess, (state, { livro }) => ({
    ...state,
    livros: [...state.livros, livro],
    loading: false,
    error: null,
  })),
  on(LivroActions.createLivroError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(LivroActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
