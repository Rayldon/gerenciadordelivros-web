import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as LivroActions from '../store/livro.actions';
import { selectLivroError, selectLivroLoading } from '../store/livro.selectors';
import { Livro } from '../../../core/models';
import { AutorService } from '../../../core/services/autor.service';
import { AssuntoService } from '../../../core/services/assunto.service';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './livro-form.component.html',
})
export class LivroFormComponent implements OnInit {
  livroForm!: FormGroup;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  autoresDisponiveis: string[] = [];
  assuntosDisponiveis: string[] = [];
  comboLoadError: string | null = null;
  loadingCombos = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private autorService: AutorService,
    private assuntoService: AssuntoService
  ) {
    this.livroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1)]],
      valor: ['', [Validators.required]],
      autores: [[], [Validators.required]],
      assuntos: [[], [Validators.required]],
    });
    this.loading$ = this.store.select(selectLivroLoading);
    this.error$ = this.store.select(selectLivroError);
  }

  ngOnInit(): void {
    this.loadCombos();
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
    const control = this.livroForm.get('autores');
    const values = (control?.value as string[] | null) ?? [];
    return !!(control && control.touched && values.length === 0);
  }

  isAssuntosInvalid(): boolean {
    const control = this.livroForm.get('assuntos');
    const values = (control?.value as string[] | null) ?? [];
    return !!(control && control.touched && values.length === 0);
  }

  onSubmit(): void {
    if (!this.livroForm.valid) {
      this.livroForm.markAllAsTouched();
      return;
    }
    const valor = this.parseCurrencyValue(this.livroForm.get('valor')?.value);
    if (valor === null || valor < 0) return;
    const autores = ((this.livroForm.get('autores')?.value as string[]) ?? [])
      .filter((a) => a && a.trim());
    const assuntos = ((this.livroForm.get('assuntos')?.value as string[]) ?? [])
      .filter((a) => a && a.trim());

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
      autores: [],
      assuntos: [],
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

  private loadCombos(): void {
    this.loadingCombos = true;
    this.comboLoadError = null;

    forkJoin({
      autores: this.autorService.getAutores(),
      assuntos: this.assuntoService.getAssuntos(),
    })
      .pipe(
        catchError(() => {
          this.comboLoadError = 'Nao foi possivel carregar autores e assuntos.';
          return of({ autores: [], assuntos: [] });
        })
      )
      .subscribe(({ autores, assuntos }) => {
        this.autoresDisponiveis = (autores ?? [])
          .map((a) => a.nome)
          .filter((n): n is string => !!n && n.trim().length > 0);
        this.assuntosDisponiveis = (assuntos ?? [])
          .map((a) => a.descricao)
          .filter((d): d is string => !!d && d.trim().length > 0);
        this.loadingCombos = false;
      });
  }
}
