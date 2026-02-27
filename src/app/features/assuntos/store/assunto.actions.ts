import { createAction, props } from '@ngrx/store';
import { Assunto } from '../../../core/models';
import { ApiError } from '../../../core/models';

export const loadAssuntos = createAction('[Assunto] Load Assuntos');

export const loadAssuntosSuccess = createAction(
  '[Assunto] Load Assuntos Success',
  props<{ assuntos: Assunto[] }>()
);

export const loadAssuntosError = createAction(
  '[Assunto] Load Assuntos Error',
  props<{ error: ApiError }>()
);

export const createAssunto = createAction(
  '[Assunto] Create Assunto',
  props<{ assunto: Assunto }>()
);

export const createAssuntoSuccess = createAction(
  '[Assunto] Create Assunto Success',
  props<{ assunto: Assunto }>()
);

export const createAssuntoError = createAction(
  '[Assunto] Create Assunto Error',
  props<{ error: ApiError }>()
);

export const updateAssunto = createAction(
  '[Assunto] Update Assunto',
  props<{ id: number; assunto: Assunto }>()
);

export const updateAssuntoSuccess = createAction(
  '[Assunto] Update Assunto Success',
  props<{ id: number; assunto: Assunto }>()
);

export const updateAssuntoError = createAction(
  '[Assunto] Update Assunto Error',
  props<{ error: ApiError }>()
);

export const deleteAssunto = createAction(
  '[Assunto] Delete Assunto',
  props<{ id: number }>()
);

export const deleteAssuntoSuccess = createAction(
  '[Assunto] Delete Assunto Success',
  props<{ id: number }>()
);

export const deleteAssuntoError = createAction(
  '[Assunto] Delete Assunto Error',
  props<{ error: ApiError }>()
);

export const clearSuccess = createAction('[Assunto] Clear Success');

export const clearError = createAction('[Assunto] Clear Error');
