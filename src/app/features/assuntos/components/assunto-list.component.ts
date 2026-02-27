import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AssuntoActions from '../store/assunto.actions';
import {
  selectAllAssuntos,
  selectAssuntoLoading,
} from '../store/assunto.selectors';
import { AssuntoFormComponent } from './assunto-form.component';

@Component({
  selector: 'app-assunto-list',
  standalone: true,
  imports: [CommonModule, AssuntoFormComponent],
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
