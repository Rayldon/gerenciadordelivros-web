import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models';
import { PageResponse } from '../models/page-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private apiUrl = `${environment.apiUrl}/livros`;

  constructor(private http: HttpClient) {}

  getLivros(page: number = 0, size: number = 10): Observable<PageResponse<Livro>> {
    const params = { page: page.toString(), size: size.toString() };
    return this.http.get<PageResponse<Livro>>(this.apiUrl, { params });
  }

  createLivro(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  updateLivro(id: number, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/${id}`, livro);
  }

  deleteLivro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
