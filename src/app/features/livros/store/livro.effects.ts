import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LivroService } from '../../../core/services/livro.service';
import * as LivroActions from './livro.actions';

@Injectable()
export class LivroEffects {
  readonly loadLivros$;
  readonly createLivro$;

  constructor(
    private actions$: Actions,
    private livroService: LivroService,
    private store: Store
  ) {
    this.loadLivros$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LivroActions.loadLivros),
        switchMap(({ page = 0, size = 10 }) =>
          this.livroService.getLivros(page, size).pipe(
            map((pageResponse) =>
              LivroActions.loadLivrosSuccess({ pageResponse })
            ),
            catchError((error) => of(LivroActions.loadLivrosError({ error })))
          )
        )
      )
    );

    this.createLivro$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LivroActions.createLivro),
        switchMap(({ livro }) =>
          this.livroService.createLivro(livro).pipe(
            map((livro) => LivroActions.createLivroSuccess({ livro })),
            catchError((error) => of(LivroActions.createLivroError({ error })))
          )
        )
      )
    );
  }

}
