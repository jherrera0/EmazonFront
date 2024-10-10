import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from '@service/toast.service';
import { of } from 'rxjs';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    const toastServiceMock = {
      toastState: of({ message: 'Test message', type: 'success' })
    };

    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [{ provide: ToastService, useValue: toastServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the toast message', () => {
    expect(component.message).toBe('Test message');
    expect(component.type).toBe('success');
    expect(component.isVisible).toBeTruthy();
  });

  it('should hide the toast message after 4 seconds', (done) => {
    setTimeout(() => {
      expect(component.isVisible).toBeFalsy();
      done();
    }, 4000);
  });
});
