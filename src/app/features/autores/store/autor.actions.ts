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

export const updateAutor = createAction(
  '[Autor] Update Autor',
  props<{ id: number; autor: Autor }>()
);

export const updateAutorSuccess = createAction(
  '[Autor] Update Autor Success',
  props<{ id: number; autor: Autor }>()
);

export const updateAutorError = createAction(
  '[Autor] Update Autor Error',
  props<{ error: ApiError }>()
);

export const deleteAutor = createAction(
  '[Autor] Delete Autor',
  props<{ id: number }>()
);

export const deleteAutorSuccess = createAction(
  '[Autor] Delete Autor Success',
  props<{ id: number }>()
);

export const deleteAutorError = createAction(
  '[Autor] Delete Autor Error',
  props<{ error: ApiError }>()
);

export const clearSuccess = createAction('[Autor] Clear Success');

export const clearError = createAction('[Autor] Clear Error');
