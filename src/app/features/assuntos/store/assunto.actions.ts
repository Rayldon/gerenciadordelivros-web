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

export const clearError = createAction('[Assunto] Clear Error');
