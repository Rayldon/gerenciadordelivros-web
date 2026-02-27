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
  readonly updateAutor$;
  readonly deleteAutor$;
  readonly reloadAfterMutationSuccess$;
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

    this.updateAutor$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AutorActions.updateAutor),
        switchMap(({ id, autor }) =>
          this.autorService.updateAutor(id, autor).pipe(
            map((updatedAutor) => AutorActions.updateAutorSuccess({ id, autor: updatedAutor })),
            catchError((error) => of(AutorActions.updateAutorError({ error })))
          )
        )
      )
    );

    this.deleteAutor$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AutorActions.deleteAutor),
        switchMap(({ id }) =>
          this.autorService.deleteAutor(id).pipe(
            map(() => AutorActions.deleteAutorSuccess({ id })),
            catchError((error) => of(AutorActions.deleteAutorError({ error })))
          )
        )
      )
    );

    this.reloadAfterMutationSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          AutorActions.createAutorSuccess,
          AutorActions.updateAutorSuccess,
          AutorActions.deleteAutorSuccess
        ),
        map(() => AutorActions.loadAutores())
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
