import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RelatorioAutoresPageComponent } from './relatorio-autores-page.component';
import { RelatorioService } from '../../../core/services/relatorio.service';

describe('RelatorioAutoresPageComponent', () => {
  let component: RelatorioAutoresPageComponent;
  let fixture: ComponentFixture<RelatorioAutoresPageComponent>;
  let serviceSpy: any;

  beforeEach(async () => {
    serviceSpy = {
      getAutoresReport: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, RelatorioAutoresPageComponent],
      providers: [{ provide: RelatorioService, useValue: serviceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioAutoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update state to success when service returns', async () => {
    const subj = new Subject<any>();
    serviceSpy.getAutoresReport.mockReturnValue(subj.asObservable());

    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button'
    );
    button.click();
    fixture.detectChanges();

    expect(component.state).toBe('loading');

    subj.next({ data: new Blob(), filename: 'f.pdf' });
    subj.complete();

    await fixture.whenStable();
    expect(component.state).toBe('success');
  });

  it('should display error alert when service fails', async () => {
    // silence console.error produced by component
    vi.spyOn(console, 'error').mockImplementation(() => {});

    serviceSpy.getAutoresReport.mockReturnValue(
      throwError(() => new Error('fail'))
    );

    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button'
    );
    button.click();
    fixture.detectChanges();

    // error happens synchronously so state becomes "error" immediately
    expect(component.state).toBe('error');
    const alert = fixture.nativeElement.querySelector('.alert-danger');
    expect(alert).toBeTruthy();
    expect(alert.textContent).toContain(
      'Não foi possível gerar o relatório'
    );
  });
});
