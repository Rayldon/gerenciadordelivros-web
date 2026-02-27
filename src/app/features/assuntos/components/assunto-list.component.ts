import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Assunto } from '../../../core/models';
import { getEntityId } from '../../../core/utils/entity-id.util';
import { mapFriendlyErrorMessage } from '../../../core/utils/error-message.util';
import * as AssuntoActions from '../store/assunto.actions';
import {
  selectAllAssuntos,
  selectAssuntoError,
  selectAssuntoLoading,
  selectAssuntoSuccess,
} from '../store/assunto.selectors';

@Component({
  selector: 'app-assunto-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './assunto-list.component.html',
})
export class AssuntoListComponent implements OnInit {
  assuntos$!: Observable<Assunto[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any | null>;
  success$!: Observable<string | null>;
  editForm: FormGroup;
  editingId: number | null = null;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.assuntos$ = this.store.select(selectAllAssuntos);
    this.loading$ = this.store.select(selectAssuntoLoading);
    this.error$ = this.store.select(selectAssuntoError);
    this.success$ = this.store.select(selectAssuntoSuccess);

    this.editForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AssuntoActions.clearError());
    this.store.dispatch(AssuntoActions.clearSuccess());
    this.store.dispatch(AssuntoActions.loadAssuntos());
  }

  startEdit(assunto: Assunto): void {
    const id = this.getId(assunto);
    if (id === null) {
      window.alert('Nao foi possivel editar: o GET /assuntos nao retorna o ID do assunto.');
      return;
    }

    this.store.dispatch(AssuntoActions.clearError());
    this.store.dispatch(AssuntoActions.clearSuccess());

    this.editingId = id;
    this.editForm.reset({
      descricao: assunto.descricao,
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editForm.reset();
  }

  saveEdit(): void {
    if (this.editingId === null || this.editForm.invalid) return;

    const assunto: Assunto = {
      id: this.editingId,
      descricao: String(this.editForm.get('descricao')?.value ?? '').trim(),
    };

    this.store.dispatch(AssuntoActions.updateAssunto({ id: this.editingId, assunto }));
    this.editingId = null;
  }

  deleteAssunto(assunto: Assunto): void {
    const id = this.getId(assunto);
    if (id === null) {
      window.alert('Nao foi possivel excluir: o GET /assuntos nao retorna o ID do assunto.');
      return;
    }

    const confirmed = window.confirm('Deseja realmente excluir este assunto?');
    if (!confirmed) return;

    this.store.dispatch(AssuntoActions.clearError());
    this.store.dispatch(AssuntoActions.clearSuccess());
    this.store.dispatch(AssuntoActions.deleteAssunto({ id }));
  }

  getId(entity: unknown): number | null {
    return getEntityId(entity);
  }

  hasEntityId(entity: unknown): boolean {
    return this.getId(entity) !== null;
  }

  toFriendlyError(error: { message?: string } | null | undefined): string {
    return mapFriendlyErrorMessage(error);
  }

  clearFeedback(): void {
    this.store.dispatch(AssuntoActions.clearError());
    this.store.dispatch(AssuntoActions.clearSuccess());
  }
}
