import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LivroService } from '../../../core/services/livro.service';
import * as LivroActions from './livro.actions';

@Injectable()
export class LivroEffects {
  readonly loadLivros$;
  readonly createLivro$;
  readonly navigateAfterCreateSuccess$;

  constructor(
    private actions$: Actions,
    private livroService: LivroService,
    private router: Router
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

    this.navigateAfterCreateSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(LivroActions.createLivroSuccess),
          tap(() => {
            void this.router.navigate(['/livros']);
          })
        ),
      { dispatch: false }
    );
  }

}
