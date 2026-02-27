import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AssuntoService } from './assunto.service';
import { environment } from '../../environments/environment';
import { Assunto } from '../models';

describe('AssuntoService', () => {
  let service: AssuntoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AssuntoService],
    });

    service = TestBed.inject(AssuntoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should update assunto via PUT', () => {
    const payload: Assunto = { id: 20, descricao: 'Assunto Atualizado' };
    let response: Assunto | undefined;

    service.updateAssunto(20, payload).subscribe((res) => (response = res));

    const req = httpMock.expectOne(`${environment.apiUrl}/assuntos/20`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    req.flush(payload);

    expect(response).toEqual(payload);
  });

  it('should delete assunto via DELETE', () => {
    service.deleteAssunto(21).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/assuntos/21`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
