import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LivroService } from './livro.service';
import { environment } from '../../environments/environment';
import { Livro } from '../models';

describe('LivroService', () => {
  let service: LivroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LivroService],
    });

    service = TestBed.inject(LivroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should update livro via PUT', () => {
    const payload: Livro = {
      id: 1,
      titulo: 'Livro Atualizado',
      valor: 123.45,
      autores: ['Autor 1'],
      assuntos: ['Assunto 1'],
    };

    let response: Livro | undefined;
    service.updateLivro(1, payload).subscribe((res) => (response = res));

    const req = httpMock.expectOne(`${environment.apiUrl}/livros/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);

    req.flush(payload);
    expect(response).toEqual(payload);
  });

  it('should delete livro via DELETE', () => {
    service.deleteLivro(2).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/livros/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
