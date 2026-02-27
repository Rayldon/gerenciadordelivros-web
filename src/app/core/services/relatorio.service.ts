import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface ReportResponse {
  data: Blob;
  filename: string;
}

@Injectable({ providedIn: 'root' })
export class RelatorioService {
  private readonly url = `${environment.apiUrl}/relatorios/autores`;

  constructor(private http: HttpClient) {}

  /**
   * Solicita o PDF de livros por autor. O nome do arquivo é extraído do
   * cabeçalho Content-Disposition. Em caso de falta de header usamos um
   * nome padrão.
   */
  getAutoresReport(): Observable<ReportResponse> {
    return this.http
      .get(this.url, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const disposition =
            resp.headers.get('Content-Disposition') || '';
          const match = /filename="?([^";]+)"?/.exec(disposition);
          const filename = match ? match[1] : 'relatorio-autores.pdf';
          return { data: resp.body as Blob, filename };
        })
      );
  }
}
