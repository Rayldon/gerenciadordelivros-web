import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AutorActions from '../store/autor.actions';
import {
  selectAllAutores,
  selectAutorLoading,
} from '../store/autor.selectors';

@Component({
  selector: 'app-autor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './autor-list.component.html',
})
export class AutorListComponent implements OnInit {
  autores$!: Observable<any[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {
    this.autores$ = this.store.select(selectAllAutores);
    this.loading$ = this.store.select(selectAutorLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(AutorActions.loadAutores());
  }
}
