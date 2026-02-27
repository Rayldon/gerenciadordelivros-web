import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RelatorioService } from './relatorio.service';
import { environment } from '../../environments/environment';

describe('RelatorioService', () => {
  let service: RelatorioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RelatorioService],
    });
    service = TestBed.inject(RelatorioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch blob and parse filename from header', () => {
    const fakeBlob = new Blob(['foo'], { type: 'application/pdf' });
    let response: any;

    service.getAutoresReport().subscribe((res) => (response = res));

    const req = httpMock.expectOne(
      `${environment.apiUrl}/relatorios/autores`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');

    req.flush(fakeBlob, {
      headers: { 'Content-Disposition': 'attachment; filename="teste.pdf"' },
    });

    expect(response).toEqual({ data: fakeBlob, filename: 'teste.pdf' });
  });

  it('should fallback to default filename when header missing', () => {
    const fakeBlob = new Blob(['foo'], { type: 'application/pdf' });
    let response: any;

    service.getAutoresReport().subscribe((res) => (response = res));
    const req = httpMock.expectOne(
      `${environment.apiUrl}/relatorios/autores`
    );
    req.flush(fakeBlob, { headers: {} });
    expect(response.filename).toBe('relatorio-autores.pdf');
  });
});
