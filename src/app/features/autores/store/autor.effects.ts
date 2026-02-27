import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AutorService } from '../../../core/services/autor.service';
import * as AutorActions from './autor.actions';

@Injectable()
export class AutorEffects {
  readonly loadAutores$;
  readonly createAutor$;
  readonly navigateAfterCreateSuccess$;

  constructor(
    private actions$: Actions,
    private autorService: AutorService,
    private router: Router
  ) {
    this.loadAutores$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AutorActions.loadAutores),
        switchMap(() =>
          this.autorService.getAutores().pipe(
            map((autores) => AutorActions.loadAutoresSuccess({ autores })),
            catchError((error) => of(AutorActions.loadAutoresError({ error })))
          )
        )
      )
    );

    this.createAutor$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AutorActions.createAutor),
        switchMap(({ autor }) =>
          this.autorService.createAutor(autor).pipe(
            map((autor) => AutorActions.createAutorSuccess({ autor })),
            catchError((error) => of(AutorActions.createAutorError({ error })))
          )
        )
      )
    );

    this.navigateAfterCreateSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AutorActions.createAutorSuccess),
          tap(() => {
            void this.router.navigate(['/autores']);
          })
        ),
      { dispatch: false }
    );
  }
}
