import { createReducer, on } from '@ngrx/store';
import * as LivroActions from './livro.actions';
import { LivroState, initialState } from './livro.selectors';

function getLivroId(livro: Record<string, unknown>): number | null {
  if (typeof livro['id'] === 'number') return livro['id'] as number;
  if (typeof livro['codl'] === 'number') return livro['codl'] as number;
  return null;
}


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
    success: null,
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
    success: 'Livro salvo com sucesso.',
  })),

  on(LivroActions.createLivroError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null,
  })),
  on(LivroActions.updateLivro, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null,
  })),
  on(LivroActions.updateLivroSuccess, (state, { id, livro }) => ({
    ...state,
    pageResponse: state.pageResponse
      ? {
          ...state.pageResponse,
          content: state.pageResponse.content.map((item) => {
            const itemId = getLivroId(item as unknown as Record<string, unknown>);
            if (itemId !== null && itemId === id) {
              return { ...item, ...livro };
            }
            return item;
          }),
        }
      : state.pageResponse,
    loading: false,
    error: null,
    success: 'Livro atualizado com sucesso.',
  })),
  on(LivroActions.updateLivroError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null,
  })),
  on(LivroActions.deleteLivro, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null,
  })),
  on(LivroActions.deleteLivroSuccess, (state, { id }) => ({
    ...state,
    pageResponse: state.pageResponse
      ? {
          ...state.pageResponse,
          content: state.pageResponse.content.filter((item) => {
            const itemId = getLivroId(item as unknown as Record<string, unknown>);
            return itemId !== id;
          }),
          totalElements: Math.max(0, state.pageResponse.totalElements - 1),
        }
      : state.pageResponse,
    loading: false,
    error: null,
    success: 'Livro excluido com sucesso.',
  })),
  on(LivroActions.deleteLivroError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null,
  })),
  on(LivroActions.clearError, (state) => ({
    ...state,
    error: null,
  })),
  on(LivroActions.clearSuccess, (state) => ({
    ...state,
    success: null,
  }))
);
