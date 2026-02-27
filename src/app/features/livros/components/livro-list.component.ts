import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as LivroActions from '../store/livro.actions';
import {
  selectAllLivros,
  selectLivroLoading,
} from '../store/livro.selectors';
import { LivroFormComponent } from './livro-form.component';

@Component({
  selector: 'app-livro-list',
  standalone: true,
  imports: [CommonModule, LivroFormComponent],
  templateUrl: './livro-list.component.html',
})
export class LivroListComponent implements OnInit {
  livros$!: Observable<any[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {
    this.livros$ = this.store.select(selectAllLivros);
    this.loading$ = this.store.select(selectLivroLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(LivroActions.loadLivros());
  }
}
