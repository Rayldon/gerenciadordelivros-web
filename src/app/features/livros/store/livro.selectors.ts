import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PageResponse } from '../../../core/models/page-response.model';
import { Livro } from '../../../core/models';

export interface LivroState {
  pageResponse: PageResponse<Livro> | null;
  loading: boolean;
  error: any | null;
  success: string | null;
}

export const initialState: LivroState = {
  pageResponse: null,
  loading: false,
  error: null,
  success: null,
};

export const selectLivroState = createFeatureSelector<LivroState>('livros');

export const selectAllLivros = createSelector(
  selectLivroState,
  (state: LivroState) => state.pageResponse?.content ?? []
);

export const selectLivroLoading = createSelector(
  selectLivroState,
  (state: LivroState) => state.loading
);

export const selectLivroError = createSelector(
  selectLivroState,
  (state: LivroState) => state.error
);

export const selectLivroSuccess = createSelector(
  selectLivroState,
  (state: LivroState) => state.success
);

export const selectLivroPage = createSelector(
  selectLivroState,
  (state: LivroState) => state.pageResponse?.page ?? 0
);

export const selectLivroSize = createSelector(
  selectLivroState,
  (state: LivroState) => state.pageResponse?.size ?? 0
);

export const selectLivroTotalElements = createSelector(
  selectLivroState,
  (state: LivroState) => state.pageResponse?.totalElements ?? 0
);

export const selectLivroTotalPages = createSelector(
  selectLivroState,
  (state: LivroState) => state.pageResponse?.totalPages ?? 0
);

export const selectLivroFirst = createSelector(
  selectLivroState,
  (state: LivroState) => state.pageResponse?.first ?? false
);

export const selectLivroLast = createSelector(
  selectLivroState,
  (state: LivroState) => state.pageResponse?.last ?? false
);
