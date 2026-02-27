import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AssuntoActions from '../store/assunto.actions';
import {
  selectAllAssuntos,
  selectAssuntoLoading,
} from '../store/assunto.selectors';

@Component({
  selector: 'app-assunto-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './assunto-list.component.html',
})
export class AssuntoListComponent implements OnInit {
  assuntos$!: Observable<any[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {
    this.assuntos$ = this.store.select(selectAllAssuntos);
    this.loading$ = this.store.select(selectAssuntoLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(AssuntoActions.loadAssuntos());
  }
}
