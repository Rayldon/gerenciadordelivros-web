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
import * as AssuntoActions from '../store/assunto.actions';
import { selectAssuntoError, selectAssuntoLoading } from '../store/assunto.selectors';
import { Assunto } from '../../../core/models';

@Component({
  selector: 'app-assunto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assunto-form.component.html',
})
export class AssuntoFormComponent {
  assuntoForm!: FormGroup;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.assuntoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(1)]],
    });
    this.loading$ = this.store.select(selectAssuntoLoading);
    this.error$ = this.store.select(selectAssuntoError);
  }

  isDescricaoInvalid(): boolean {
    const control = this.assuntoForm.get('descricao');
    return !!(control && control.invalid && control.touched);
  }

  onSubmit(): void {
    if (!this.assuntoForm.valid) return;

    const assunto: Assunto = {
      descricao: this.assuntoForm.get('descricao')?.value,
    };

    this.store.dispatch(AssuntoActions.createAssunto({ assunto }));
    this.assuntoForm.reset();
  }

  clearError(): void {
    this.store.dispatch(AssuntoActions.clearError());
  }
}
