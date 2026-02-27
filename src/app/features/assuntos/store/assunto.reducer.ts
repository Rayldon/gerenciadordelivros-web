import { createReducer, on } from '@ngrx/store';
import * as AssuntoActions from './assunto.actions';
import { AssuntoState, initialState } from './assunto.selectors';

function getAssuntoId(assunto: Record<string, unknown>): number | null {
  if (typeof assunto['id'] === 'number') return assunto['id'] as number;
  if (typeof assunto['codAs'] === 'number') return assunto['codAs'] as number;
  return null;
}

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
    success: null,
  })),
  on(AssuntoActions.createAssuntoSuccess, (state, { assunto }) => ({
    ...state,
    assuntos: [...state.assuntos, assunto],
    loading: false,
    error: null,
    success: 'Assunto salvo com sucesso.',
  })),
  on(AssuntoActions.createAssuntoError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null,
  })),
  on(AssuntoActions.updateAssunto, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null,
  })),
  on(AssuntoActions.updateAssuntoSuccess, (state, { id, assunto }) => ({
    ...state,
    assuntos: state.assuntos.map((item) => {
      const itemId = getAssuntoId(item as Record<string, unknown>);
      if (itemId !== null && itemId === id) {
        return { ...item, ...assunto };
      }
      return item;
    }),
    loading: false,
    error: null,
    success: 'Assunto atualizado com sucesso.',
  })),
  on(AssuntoActions.updateAssuntoError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null,
  })),
  on(AssuntoActions.deleteAssunto, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null,
  })),
  on(AssuntoActions.deleteAssuntoSuccess, (state, { id }) => ({
    ...state,
    assuntos: state.assuntos.filter((item) => {
      const itemId = getAssuntoId(item as Record<string, unknown>);
      return itemId !== id;
    }),
    loading: false,
    error: null,
    success: 'Assunto excluido com sucesso.',
  })),
  on(AssuntoActions.deleteAssuntoError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null,
  })),
  on(AssuntoActions.clearError, (state) => ({
    ...state,
    error: null,
  })),
  on(AssuntoActions.clearSuccess, (state) => ({
    ...state,
    success: null,
  }))
);
