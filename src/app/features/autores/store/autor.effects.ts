import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AutorService } from '../../../core/services/autor.service';
import * as AutorActions from './autor.actions';

@Injectable()
export class AutorEffects {
  readonly loadAutores$;
  readonly createAutor$;

  constructor(
    private actions$: Actions,
    private autorService: AutorService,
    private store: Store
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
  }
}
