import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AssuntoService } from '../../../core/services/assunto.service';
import * as AssuntoActions from './assunto.actions';

@Injectable()
export class AssuntoEffects {
  readonly loadAssuntos$;
  readonly createAssunto$;
  readonly navigateAfterCreateSuccess$;

  constructor(
    private actions$: Actions,
    private assuntoService: AssuntoService,
    private router: Router
  ) {
    this.loadAssuntos$ = createEffect(() =>
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

    this.createAssunto$ = createEffect(() =>
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

    this.navigateAfterCreateSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AssuntoActions.createAssuntoSuccess),
          tap(() => {
            void this.router.navigate(['/assuntos']);
          })
        ),
      { dispatch: false }
    );
  }
}
