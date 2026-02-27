import { Routes } from '@angular/router';
import { LivroListComponent } from './features/livros/components/livro-list.component';
import { LivroFormComponent } from './features/livros/components/livro-form.component';
import { AutorListComponent } from './features/autores/components/autor-list.component';
import { AutorFormComponent } from './features/autores/components/autor-form.component';
import { AssuntoListComponent } from './features/assuntos/components/assunto-list.component';
import { AssuntoFormComponent } from './features/assuntos/components/assunto-form.component';
import { RelatorioAutoresPageComponent } from './features/relatorios/components/relatorio-autores-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/livros', pathMatch: 'full' },
  { path: 'livros', component: LivroListComponent },
  { path: 'livros/novo', component: LivroFormComponent },
  { path: 'autores', component: AutorListComponent },
  { path: 'autores/novo', component: AutorFormComponent },
  { path: 'assuntos', component: AssuntoListComponent },
  { path: 'assuntos/novo', component: AssuntoFormComponent },
  { path: 'relatorios/autores', component: RelatorioAutoresPageComponent },
  { path: '**', redirectTo: '/livros' },
];
