import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioService } from '../../../core/services/relatorio.service';

type UiState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-relatorio-autores-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorio-autores-page.component.html',
  styleUrls: ['./relatorio-autores-page.component.css'],
})
export class RelatorioAutoresPageComponent {
  state: UiState = 'idle';
  errorMessage: string | null = null;

  constructor(private relatorio: RelatorioService) {}

  generate(): void {
    if (this.state === 'loading') {
      return;
    }

    this.state = 'loading';
    this.errorMessage = null;

    this.relatorio.getAutoresReport().subscribe({
      next: ({ data, filename }) => {
        const url = URL.createObjectURL(data);
        window.open(url, '_blank');

        // força download imediato
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        // opcionalmente revogamos depois de um pequeno delay
        setTimeout(() => URL.revokeObjectURL(url), 5000);

        this.state = 'success';
      },
      error: (err) => {
        console.error('relatorio erro', err);
        this.errorMessage =
          'Não foi possível gerar o relatório. Tente novamente mais tarde.';
        this.state = 'error';
      },
    });
  }
}
