import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface LivroState {
  livros: any[];
  loading: boolean;
  error: any | null;
}

export const initialState: LivroState = {
  livros: [],
  loading: false,
  error: null,
};

export const selectLivroState = createFeatureSelector<LivroState>('livros');

export const selectAllLivros = createSelector(
  selectLivroState,
  (state: LivroState) => state.livros
);

export const selectLivroLoading = createSelector(
  selectLivroState,
  (state: LivroState) => state.loading
);

export const selectLivroError = createSelector(
  selectLivroState,
  (state: LivroState) => state.error
);
