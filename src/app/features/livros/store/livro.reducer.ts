import { createReducer, on } from '@ngrx/store';
import * as LivroActions from './livro.actions';
import { LivroState, initialState } from './livro.selectors';

// note: LivroState now contains pageResponse


export const livroReducer = createReducer(
  initialState,
  on(LivroActions.loadLivros, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LivroActions.loadLivrosSuccess, (state, { pageResponse }) => ({
    ...state,
    pageResponse,
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
    // if pageResponse exists, append to current page content otherwise ignore
    pageResponse: state.pageResponse
      ? {
          ...state.pageResponse,
          content: [...state.pageResponse.content, livro],
          totalElements: state.pageResponse.totalElements + 1,
        }
      : state.pageResponse,
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
