import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AssuntoService } from '../../../core/services/assunto.service';
import * as AssuntoActions from './assunto.actions';

@Injectable()
export class AssuntoEffects {
  loadAssuntos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssuntoActions.loadAssuntos),
      switchMap(() =>
        this.assuntoService.getAssuntos().pipe(
          map((assuntos) => AssuntoActions.loadAssuntosSuccess({ assuntos })),
          catchError((error) => of(AssuntoActions.loadAssuntosError({ error })))
        )
      )
    )
  );

  createAssunto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssuntoActions.createAssunto),
      switchMap(({ assunto }) =>
        this.assuntoService.createAssunto(assunto).pipe(
          map((assunto) => AssuntoActions.createAssuntoSuccess({ assunto })),
          catchError((error) => of(AssuntoActions.createAssuntoError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private assuntoService: AssuntoService,
    private store: Store
  ) {}
}
