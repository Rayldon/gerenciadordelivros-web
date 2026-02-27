import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Autor } from '../../../core/models';
import { getEntityId } from '../../../core/utils/entity-id.util';
import { mapFriendlyErrorMessage } from '../../../core/utils/error-message.util';
import * as AutorActions from '../store/autor.actions';
import {
  selectAllAutores,
  selectAutorError,
  selectAutorLoading,
  selectAutorSuccess,
} from '../store/autor.selectors';

@Component({
  selector: 'app-autor-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './autor-list.component.html',
})
export class AutorListComponent implements OnInit {
  autores$!: Observable<Autor[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any | null>;
  success$!: Observable<string | null>;
  editForm: FormGroup;
  editingId: number | null = null;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.autores$ = this.store.select(selectAllAutores);
    this.loading$ = this.store.select(selectAutorLoading);
    this.error$ = this.store.select(selectAutorError);
    this.success$ = this.store.select(selectAutorSuccess);

    this.editForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AutorActions.clearError());
    this.store.dispatch(AutorActions.clearSuccess());
    this.store.dispatch(AutorActions.loadAutores());
  }

  startEdit(autor: Autor): void {
    const id = this.getId(autor);
    if (id === null) {
      window.alert('Nao foi possivel editar: o GET /autores nao retorna o ID do autor.');
      return;
    }

    this.store.dispatch(AutorActions.clearError());
    this.store.dispatch(AutorActions.clearSuccess());

    this.editingId = id;
    this.editForm.reset({
      nome: autor.nome,
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editForm.reset();
  }

  saveEdit(): void {
    if (this.editingId === null || this.editForm.invalid) return;

    const autor: Autor = {
      id: this.editingId,
      nome: String(this.editForm.get('nome')?.value ?? '').trim(),
    };

    this.store.dispatch(AutorActions.updateAutor({ id: this.editingId, autor }));
    this.editingId = null;
  }

  deleteAutor(autor: Autor): void {
    const id = this.getId(autor);
    if (id === null) {
      window.alert('Nao foi possivel excluir: o GET /autores nao retorna o ID do autor.');
      return;
    }

    const confirmed = window.confirm('Deseja realmente excluir este autor?');
    if (!confirmed) return;

    this.store.dispatch(AutorActions.clearError());
    this.store.dispatch(AutorActions.clearSuccess());
    this.store.dispatch(AutorActions.deleteAutor({ id }));
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
    this.store.dispatch(AutorActions.clearError());
    this.store.dispatch(AutorActions.clearSuccess());
  }
}
