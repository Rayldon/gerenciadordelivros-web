import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LivroService } from '../../../core/services/livro.service';
import * as LivroActions from './livro.actions';

@Injectable()
export class LivroEffects {
  loadLivros$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LivroActions.loadLivros),
      switchMap(() =>
        this.livroService.getLivros().pipe(
          map((livros) => LivroActions.loadLivrosSuccess({ livros })),
          catchError((error) => of(LivroActions.loadLivrosError({ error })))
        )
      )
    )
  );

  createLivro$ = createEffect(() =>
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

  constructor(
    private actions$: Actions,
    private livroService: LivroService,
    private store: Store
  ) {}
}
