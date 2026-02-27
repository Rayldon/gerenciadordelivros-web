import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AutorActions from '../store/autor.actions';
import { selectAutorError, selectAutorLoading } from '../store/autor.selectors';
import { Autor } from '../../../core/models';

@Component({
  selector: 'app-autor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './autor-form.component.html',
})
export class AutorFormComponent {
  autorForm!: FormGroup;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.autorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(1)]],
    });
    this.loading$ = this.store.select(selectAutorLoading);
    this.error$ = this.store.select(selectAutorError);
  }

  isNomeInvalid(): boolean {
    const control = this.autorForm.get('nome');
    return !!(control && control.invalid && control.touched);
  }

  onSubmit(): void {
    if (!this.autorForm.valid) return;

    const autor: Autor = {
      nome: this.autorForm.get('nome')?.value,
    };

    this.store.dispatch(AutorActions.createAutor({ autor }));
    this.autorForm.reset();
  }

  clearError(): void {
    this.store.dispatch(AutorActions.clearError());
  }
}
