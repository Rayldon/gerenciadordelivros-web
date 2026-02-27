import { createReducer, on } from '@ngrx/store';
import * as AutorActions from './autor.actions';
import { AutorState, initialState } from './autor.selectors';

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
  })),
  on(AutorActions.createAutorSuccess, (state, { autor }) => ({
    ...state,
    autores: [...state.autores, autor],
    loading: false,
    error: null,
  })),
  on(AutorActions.createAutorError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AutorActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
