import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AssuntoState {
  assuntos: any[];
  loading: boolean;
  error: any | null;
  success: string | null;
}

export const initialState: AssuntoState = {
  assuntos: [],
  loading: false,
  error: null,
  success: null,
};

export const selectAssuntoState = createFeatureSelector<AssuntoState>('assuntos');

export const selectAllAssuntos = createSelector(
  selectAssuntoState,
  (state: AssuntoState) => state.assuntos
);

export const selectAssuntoLoading = createSelector(
  selectAssuntoState,
  (state: AssuntoState) => state.loading
);

export const selectAssuntoError = createSelector(
  selectAssuntoState,
  (state: AssuntoState) => state.error
);

export const selectAssuntoSuccess = createSelector(
  selectAssuntoState,
  (state: AssuntoState) => state.success
);
