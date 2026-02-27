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
import * as LivroActions from '../store/livro.actions';
import { selectLivroError, selectLivroLoading } from '../store/livro.selectors';
import { Livro } from '../../../core/models';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './livro-form.component.html',
})
export class LivroFormComponent {
  livroForm!: FormGroup;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.livroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1)]],
      valor: ['', [Validators.required]],
      autores: this.fb.array([this.fb.control('')]),
      assuntos: this.fb.array([this.fb.control('')]),
    });
    this.loading$ = this.store.select(selectLivroLoading);
    this.error$ = this.store.select(selectLivroError);
  }

  get autoresArray() {
    return (this.livroForm.get('autores') as any).controls;
  }

  get assuntosArray() {
    return (this.livroForm.get('assuntos') as any).controls;
  }

  addAutor(): void {
    const autoresArray = this.livroForm.get('autores') as any;
    autoresArray.push(this.fb.control(''));
  }

  removeAutor(index: number): void {
    const autoresArray = this.livroForm.get('autores') as any;
    if (autoresArray.length > 1) {
      autoresArray.removeAt(index);
    }
  }

  addAssunto(): void {
    const assuntosArray = this.livroForm.get('assuntos') as any;
    assuntosArray.push(this.fb.control(''));
  }

  removeAssunto(index: number): void {
    const assuntosArray = this.livroForm.get('assuntos') as any;
    if (assuntosArray.length > 1) {
      assuntosArray.removeAt(index);
    }
  }

  isTituloInvalid(): boolean {
    const control = this.livroForm.get('titulo');
    return !!(control && control.invalid && control.touched);
  }

  isValorInvalid(): boolean {
    const control = this.livroForm.get('valor');
    const valor = this.parseCurrencyValue(control?.value);
    return !!(control && control.touched && (control.invalid || valor === null));
  }

  isAutoresInvalid(): boolean {
    const autoresArray = this.livroForm.get('autores') as any;
    const nonEmptyAutores = autoresArray.value.filter(
      (a: string) => a && a.trim()
    );
    return nonEmptyAutores.length === 0;
  }

  isAssuntosInvalid(): boolean {
    const assuntosArray = this.livroForm.get('assuntos') as any;
    const nonEmptyAssuntos = assuntosArray.value.filter(
      (a: string) => a && a.trim()
    );
    return nonEmptyAssuntos.length === 0;
  }

  onSubmit(): void {
    if (!this.livroForm.valid) return;
    const valor = this.parseCurrencyValue(this.livroForm.get('valor')?.value);
    if (valor === null || valor < 0) return;

    const autoresArray = this.livroForm.get('autores') as any;
    const assuntosArray = this.livroForm.get('assuntos') as any;

    const autores = autoresArray.value.filter((a: string) => a && a.trim());
    const assuntos = assuntosArray.value.filter((a: string) => a && a.trim());

    if (autores.length === 0 || assuntos.length === 0) return;

    const livro: Livro = {
      titulo: this.livroForm.get('titulo')?.value,
      valor,
      autores,
      assuntos,
    };

    this.store.dispatch(LivroActions.createLivro({ livro }));
    this.livroForm.reset({
      titulo: '',
      valor: '',
      autores: [''],
      assuntos: [''],
    });
  }

  clearError(): void {
    this.store.dispatch(LivroActions.clearError());
  }

  onValorInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const onlyDigits = input.value.replace(/\D/g, '');
    const maskedValue = this.maskCurrencyValue(onlyDigits);

    input.value = maskedValue;
    this.livroForm.get('valor')?.setValue(maskedValue, { emitEvent: false });
  }

  private maskCurrencyValue(digits: string): string {
    if (!digits) return '';

    const numericValue = Number(digits) / 100;
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue);
  }

  private parseCurrencyValue(value: unknown): number | null {
    const raw = String(value ?? '').trim();
    if (!raw) return null;

    const normalized = raw.replace(/\./g, '').replace(',', '.');
    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : null;
  }
}
