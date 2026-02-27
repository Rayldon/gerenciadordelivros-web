import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AutorState {
  autores: any[];
  loading: boolean;
  error: any | null;
}

export const initialState: AutorState = {
  autores: [],
  loading: false,
  error: null,
};

export const selectAutorState = createFeatureSelector<AutorState>('autores');

export const selectAllAutores = createSelector(
  selectAutorState,
  (state: AutorState) => state.autores
);

export const selectAutorLoading = createSelector(
  selectAutorState,
  (state: AutorState) => state.loading
);

export const selectAutorError = createSelector(
  selectAutorState,
  (state: AutorState) => state.error
);
