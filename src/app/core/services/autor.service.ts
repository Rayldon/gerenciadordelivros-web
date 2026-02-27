import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private apiUrl = `${environment.apiUrl}/autores`;

  constructor(private http: HttpClient) {}

  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }

  createAutor(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  updateAutor(id: number, autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.apiUrl}/${id}`, autor);
  }

  deleteAutor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
