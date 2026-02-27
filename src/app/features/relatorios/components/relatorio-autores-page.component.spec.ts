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

  it('should show loading spinner and then success message', async () => {
    const subj = new Subject<any>();
    serviceSpy.getAutoresReport.mockReturnValue(subj.asObservable());

    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button'
    );
    button.click();
    fixture.detectChanges();

    expect(component.state).toBe('loading');
    expect(
      fixture.nativeElement.querySelector('.spinner-border')
    ).toBeTruthy();

    subj.next({ data: new Blob(), filename: 'f.pdf' });
    subj.complete();
    await Promise.resolve();
    fixture.detectChanges();

    expect(component.state).toBe('success');
    expect(
      fixture.nativeElement.querySelector('.alert-success')
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.spinner-border')
    ).toBeNull();
  });

  it('should display error alert when service fails', async () => {
    serviceSpy.getAutoresReport.mockReturnValue(
      throwError(() => new Error('fail'))
    );

    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button'
    );
    button.click();
    fixture.detectChanges();

    expect(component.state).toBe('loading');

    await Promise.resolve();
    fixture.detectChanges();

    expect(component.state).toBe('error');
    const alert = fixture.nativeElement.querySelector('.alert-danger');
    expect(alert).toBeTruthy();
    expect(alert.textContent).toContain(
      'Não foi possível gerar o relatório'
    );
  });
});
