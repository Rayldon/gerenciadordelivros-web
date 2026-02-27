import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import * as LivroActions from '../store/livro.actions';
import {
  selectAllLivros,
  selectLivroLoading,
  selectLivroPage,
  selectLivroSize,
  selectLivroTotalPages,
  selectLivroTotalElements,
  selectLivroFirst,
  selectLivroLast,
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

  // pagination selectors
  page$!: Observable<number>;
  size$!: Observable<number>;
  totalPages$!: Observable<number>;
  totalElements$!: Observable<number>;
  first$!: Observable<boolean>;
  last$!: Observable<boolean>;

  constructor(private store: Store) {
    this.livros$ = this.store.select(selectAllLivros);
    this.loading$ = this.store.select(selectLivroLoading);

    this.page$ = this.store.select(selectLivroPage);
    this.size$ = this.store.select(selectLivroSize);
    this.totalPages$ = this.store.select(selectLivroTotalPages);
    this.totalElements$ = this.store.select(selectLivroTotalElements);
    this.first$ = this.store.select(selectLivroFirst);
    this.last$ = this.store.select(selectLivroLast);
  }

  ngOnInit(): void {
    this.loadPage(0, 10);
  }

  loadPage(page: number, size: number): void {
    this.store.dispatch(LivroActions.loadLivros({ page, size }));
  }

  prev(): void {
    combineLatest([this.page$, this.size$])
      .pipe(take(1))
      .subscribe(([p, sz]) => {
        if (p > 0) {
          this.loadPage(p - 1, sz);
        }
      });
  }

  next(): void {
    combineLatest([this.page$, this.size$, this.totalPages$])
      .pipe(take(1))
      .subscribe(([p, sz, tp]) => {
        if (p < tp - 1) {
          this.loadPage(p + 1, sz);
        }
      });
  }

  changeSize(event: Event): void {
    const select = event.target as HTMLSelectElement | null;
    if (select) {
      const sz = Number(select.value);
      this.loadPage(0, sz);
    }
  }
}

