import { createReducer, on } from '@ngrx/store';
import * as AutorActions from './autor.actions';
import { AutorState, initialState } from './autor.selectors';

function getAutorId(autor: Record<string, unknown>): number | null {
  if (typeof autor['id'] === 'number') return autor['id'] as number;
  if (typeof autor['codAu'] === 'number') return autor['codAu'] as number;
  return null;
}

export const autorReducer = createReducer(
  initialState,
  on(AutorActions.loadAutores, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AutorActions.loadAutoresSuccess, (state, { autores }) => ({
    ...state,
    autores,
    loading: false,
    error: null,
  })),
  on(AutorActions.loadAutoresError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AutorActions.createAutor, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null,
  })),
  on(AutorActions.createAutorSuccess, (state, { autor }) => ({
    ...state,
    autores: [...state.autores, autor],
    loading: false,
    error: null,
    success: 'Autor salvo com sucesso.',
  })),
  on(AutorActions.createAutorError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null,
  })),
  on(AutorActions.updateAutor, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null,
  })),
  on(AutorActions.updateAutorSuccess, (state, { id, autor }) => ({
    ...state,
    autores: state.autores.map((item) => {
      const itemId = getAutorId(item as Record<string, unknown>);
      if (itemId !== null && itemId === id) {
        return { ...item, ...autor };
      }
      return item;
    }),
    loading: false,
    error: null,
    success: 'Autor atualizado com sucesso.',
  })),
  on(AutorActions.updateAutorError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null,
  })),
  on(AutorActions.deleteAutor, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null,
  })),
  on(AutorActions.deleteAutorSuccess, (state, { id }) => ({
    ...state,
    autores: state.autores.filter((item) => {
      const itemId = getAutorId(item as Record<string, unknown>);
      return itemId !== id;
    }),
    loading: false,
    error: null,
    success: 'Autor excluido com sucesso.',
  })),
  on(AutorActions.deleteAutorError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null,
  })),
  on(AutorActions.clearError, (state) => ({
    ...state,
    error: null,
  })),
  on(AutorActions.clearSuccess, (state) => ({
    ...state,
    success: null,
  }))
);
