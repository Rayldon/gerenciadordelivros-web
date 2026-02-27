import { Routes } from '@angular/router';
import { LivroListComponent } from './features/livros/components/livro-list.component';
import { AutorListComponent } from './features/autores/components/autor-list.component';
import { AssuntoListComponent } from './features/assuntos/components/assunto-list.component';
import { RelatorioAutoresPageComponent } from './features/relatorios/components/relatorio-autores-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/livros', pathMatch: 'full' },
  { path: 'livros', component: LivroListComponent },
  { path: 'autores', component: AutorListComponent },
  { path: 'assuntos', component: AssuntoListComponent },
  { path: 'relatorios/autores', component: RelatorioAutoresPageComponent },
  { path: '**', redirectTo: '/livros' },
];
