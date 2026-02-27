import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AutorService } from './autor.service';
import { environment } from '../../environments/environment';
import { Autor } from '../models';

describe('AutorService', () => {
  let service: AutorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutorService],
    });

    service = TestBed.inject(AutorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should update autor via PUT', () => {
    const payload: Autor = { id: 10, nome: 'Autor Atualizado' };
    let response: Autor | undefined;

    service.updateAutor(10, payload).subscribe((res) => (response = res));

    const req = httpMock.expectOne(`${environment.apiUrl}/autores/10`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    req.flush(payload);

    expect(response).toEqual(payload);
  });

  it('should delete autor via DELETE', () => {
    service.deleteAutor(11).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/autores/11`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
