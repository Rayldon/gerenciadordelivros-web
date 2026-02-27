import { createReducer, on } from '@ngrx/store';
import * as AssuntoActions from './assunto.actions';
import { AssuntoState, initialState } from './assunto.selectors';

export const assuntoReducer = createReducer(
  initialState,
  on(AssuntoActions.loadAssuntos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AssuntoActions.loadAssuntosSuccess, (state, { assuntos }) => ({
    ...state,
    assuntos,
    loading: false,
    error: null,
  })),
  on(AssuntoActions.loadAssuntosError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AssuntoActions.createAssunto, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AssuntoActions.createAssuntoSuccess, (state, { assunto }) => ({
    ...state,
    assuntos: [...state.assuntos, assunto],
    loading: false,
    error: null,
  })),
  on(AssuntoActions.createAssuntoError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AssuntoActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
