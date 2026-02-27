import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { livroReducer } from './features/livros/store/livro.reducer';
import { LivroEffects } from './features/livros/store/livro.effects';
import { autorReducer } from './features/autores/store/autor.reducer';
import { AutorEffects } from './features/autores/store/autor.effects';
import { assuntoReducer } from './features/assuntos/store/assunto.reducer';
import { AssuntoEffects } from './features/assuntos/store/assunto.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    provideStore({
      livros: livroReducer,
      autores: autorReducer,
      assuntos: assuntoReducer,
    }),
    provideEffects([LivroEffects, AutorEffects, AssuntoEffects]),
  ],
};

