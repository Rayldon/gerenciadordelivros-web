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
  readonly updateAssunto$;
  readonly deleteAssunto$;
  readonly reloadAfterMutationSuccess$;
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

    this.updateAssunto$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AssuntoActions.updateAssunto),
        switchMap(({ id, assunto }) =>
          this.assuntoService.updateAssunto(id, assunto).pipe(
            map((updatedAssunto) => AssuntoActions.updateAssuntoSuccess({ id, assunto: updatedAssunto })),
            catchError((error) => of(AssuntoActions.updateAssuntoError({ error })))
          )
        )
      )
    );

    this.deleteAssunto$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AssuntoActions.deleteAssunto),
        switchMap(({ id }) =>
          this.assuntoService.deleteAssunto(id).pipe(
            map(() => AssuntoActions.deleteAssuntoSuccess({ id })),
            catchError((error) => of(AssuntoActions.deleteAssuntoError({ error })))
          )
        )
      )
    );

    this.reloadAfterMutationSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          AssuntoActions.createAssuntoSuccess,
          AssuntoActions.updateAssuntoSuccess,
          AssuntoActions.deleteAssuntoSuccess
        ),
        map(() => AssuntoActions.loadAssuntos())
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
