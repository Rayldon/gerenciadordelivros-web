import { createAction, props } from '@ngrx/store';
import { Autor } from '../../../core/models';
import { ApiError } from '../../../core/models';

export const loadAutores = createAction('[Autor] Load Autores');

export const loadAutoresSuccess = createAction(
  '[Autor] Load Autores Success',
  props<{ autores: Autor[] }>()
);

export const loadAutoresError = createAction(
  '[Autor] Load Autores Error',
  props<{ error: ApiError }>()
);

export const createAutor = createAction(
  '[Autor] Create Autor',
  props<{ autor: Autor }>()
);

export const createAutorSuccess = createAction(
  '[Autor] Create Autor Success',
  props<{ autor: Autor }>()
);

export const createAutorError = createAction(
  '[Autor] Create Autor Error',
  props<{ error: ApiError }>()
);

export const clearError = createAction('[Autor] Clear Error');
