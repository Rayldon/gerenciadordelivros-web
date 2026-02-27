import { createAction, props } from '@ngrx/store';
import { Livro } from '../../../core/models';
import { ApiError } from '../../../core/models';

export const loadLivros = createAction('[Livro] Load Livros');

export const loadLivrosSuccess = createAction(
  '[Livro] Load Livros Success',
  props<{ livros: Livro[] }>()
);

export const loadLivrosError = createAction(
  '[Livro] Load Livros Error',
  props<{ error: ApiError }>()
);

export const createLivro = createAction(
  '[Livro] Create Livro',
  props<{ livro: Livro }>()
);

export const createLivroSuccess = createAction(
  '[Livro] Create Livro Success',
  props<{ livro: Livro }>()
);

export const createLivroError = createAction(
  '[Livro] Create Livro Error',
  props<{ error: ApiError }>()
);

export const clearError = createAction('[Livro] Clear Error');
