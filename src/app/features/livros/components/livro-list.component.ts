import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { Livro } from '../../../core/models';
import { getEntityId } from '../../../core/utils/entity-id.util';
import { mapFriendlyErrorMessage } from '../../../core/utils/error-message.util';
import * as LivroActions from '../store/livro.actions';
import {
  selectAllLivros,
  selectLivroError,
  selectLivroLoading,
  selectLivroPage,
  selectLivroSize,
  selectLivroSuccess,
  selectLivroTotalPages,
  selectLivroTotalElements,
  selectLivroFirst,
  selectLivroLast,
} from '../store/livro.selectors';

@Component({
  selector: 'app-livro-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './livro-list.component.html',
})
export class LivroListComponent implements OnInit {
  livros$!: Observable<Livro[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any | null>;
  success$!: Observable<string | null>;
  editForm: FormGroup;
  editingId: number | null = null;

  // pagination selectors
  page$!: Observable<number>;
  size$!: Observable<number>;
  totalPages$!: Observable<number>;
  totalElements$!: Observable<number>;
  first$!: Observable<boolean>;
  last$!: Observable<boolean>;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.livros$ = this.store.select(selectAllLivros);
    this.loading$ = this.store.select(selectLivroLoading);
    this.error$ = this.store.select(selectLivroError);
    this.success$ = this.store.select(selectLivroSuccess);

    this.page$ = this.store.select(selectLivroPage);
    this.size$ = this.store.select(selectLivroSize);
    this.totalPages$ = this.store.select(selectLivroTotalPages);
    this.totalElements$ = this.store.select(selectLivroTotalElements);
    this.first$ = this.store.select(selectLivroFirst);
    this.last$ = this.store.select(selectLivroLast);

    this.editForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1)]],
      valor: ['', [Validators.required]],
      autores: ['', [Validators.required]],
      assuntos: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(LivroActions.clearError());
    this.store.dispatch(LivroActions.clearSuccess());
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

  startEdit(livro: Livro): void {
    const id = this.getId(livro);
    if (id === null) {
      window.alert('Nao foi possivel editar: o GET /livros nao retorna o ID do livro.');
      return;
    }

    this.store.dispatch(LivroActions.clearError());
    this.store.dispatch(LivroActions.clearSuccess());

    this.editingId = id;
    this.editForm.reset({
      titulo: livro.titulo,
      valor: this.maskCurrencyValueFromNumber(livro.valor),
      autores: livro.autores.join(', '),
      assuntos: livro.assuntos.join(', '),
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editForm.reset();
  }

  saveEdit(): void {
    if (this.editingId === null || this.editForm.invalid) return;

    const valor = this.parseCurrencyValue(this.editForm.get('valor')?.value);
    if (valor === null || valor < 0) {
      this.editForm.get('valor')?.markAsTouched();
      return;
    }

    const autores = this.splitListField(this.editForm.get('autores')?.value);
    const assuntos = this.splitListField(this.editForm.get('assuntos')?.value);
    if (autores.length === 0 || assuntos.length === 0) return;

    const livro: Livro = {
      id: this.editingId,
      titulo: String(this.editForm.get('titulo')?.value ?? '').trim(),
      valor,
      autores,
      assuntos,
    };

    this.store.dispatch(LivroActions.updateLivro({ id: this.editingId, livro }));
    this.editingId = null;
  }

  deleteLivro(livro: Livro): void {
    const id = this.getId(livro);
    if (id === null) {
      window.alert('Nao foi possivel excluir: o GET /livros nao retorna o ID do livro.');
      return;
    }

    const confirmed = window.confirm('Deseja realmente excluir este livro?');
    if (!confirmed) return;

    this.store.dispatch(LivroActions.clearError());
    this.store.dispatch(LivroActions.clearSuccess());
    this.store.dispatch(LivroActions.deleteLivro({ id }));
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
    this.store.dispatch(LivroActions.clearError());
    this.store.dispatch(LivroActions.clearSuccess());
  }

  onEditValorInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const onlyDigits = input.value.replace(/\D/g, '');
    const maskedValue = this.maskCurrencyValueFromDigits(onlyDigits);
    input.value = maskedValue;
    this.editForm.get('valor')?.setValue(maskedValue, { emitEvent: false });
  }

  private splitListField(value: unknown): string[] {
    return String(value ?? '')
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  private maskCurrencyValueFromNumber(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value ?? 0);
  }

  private maskCurrencyValueFromDigits(digits: string): string {
    if (!digits) return '';
    const numericValue = Number(digits) / 100;
    return this.maskCurrencyValueFromNumber(numericValue);
  }

  private parseCurrencyValue(value: unknown): number | null {
    const raw = String(value ?? '').trim();
    if (!raw) return null;

    const normalized = raw.replace(/\./g, '').replace(',', '.');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }
}

