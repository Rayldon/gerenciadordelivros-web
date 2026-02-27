import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assunto } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssuntoService {
  private apiUrl = `${environment.apiUrl}/assuntos`;

  constructor(private http: HttpClient) {}

  getAssuntos(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.apiUrl);
  }

  createAssunto(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(this.apiUrl, assunto);
  }
}
