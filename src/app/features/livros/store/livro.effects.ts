import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { LivroService } from '../../../core/services/livro.service';
import * as LivroActions from './livro.actions';
import { selectLivroPage, selectLivroSize } from './livro.selectors';

@Injectable()
export class LivroEffects {
  readonly loadLivros$;
  readonly createLivro$;
  readonly updateLivro$;
  readonly deleteLivro$;
  readonly reloadAfterMutationSuccess$;
  readonly navigateAfterCreateSuccess$;

  constructor(
    private actions$: Actions,
    private livroService: LivroService,
    private store: Store,
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

    this.updateLivro$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LivroActions.updateLivro),
        switchMap(({ id, livro }) =>
          this.livroService.updateLivro(id, livro).pipe(
            map((updatedLivro) => LivroActions.updateLivroSuccess({ id, livro: updatedLivro })),
            catchError((error) => of(LivroActions.updateLivroError({ error })))
          )
        )
      )
    );

    this.deleteLivro$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LivroActions.deleteLivro),
        switchMap(({ id }) =>
          this.livroService.deleteLivro(id).pipe(
            map(() => LivroActions.deleteLivroSuccess({ id })),
            catchError((error) => of(LivroActions.deleteLivroError({ error })))
          )
        )
      )
    );

    this.reloadAfterMutationSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          LivroActions.createLivroSuccess,
          LivroActions.updateLivroSuccess,
          LivroActions.deleteLivroSuccess
        ),
        withLatestFrom(
          this.store.select(selectLivroPage),
          this.store.select(selectLivroSize)
        ),
        map(([_, page, size]) => LivroActions.loadLivros({ page, size: size || 10 }))
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
