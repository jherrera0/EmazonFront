import { TestBed } from '@angular/core/testing';
import { ToastService, Toast } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit toast message', (done) => {
    const testMessage = 'Test message';
    const testType: Toast['type'] = 'success';

    service.toastState.subscribe((toast: Toast) => {
      expect(toast.message).toBe(testMessage);
      expect(toast.type).toBe(testType);
      done();
    });

    service.showToast(testMessage, testType);
  });

  it('should emit toast message with default type', (done) => {
    const testMessage = 'Test message';

    service.toastState.subscribe((toast: Toast) => {
      expect(toast.message).toBe(testMessage);
      expect(toast.type).toBe('success');
      done();
    });

    service.showToast(testMessage);
  });

  it('should emit toast message with error type', (done) => {
    const testMessage = 'Error message';
    const testType: Toast['type'] = 'error';

    service.toastState.subscribe((toast: Toast) => {
      expect(toast.message).toBe(testMessage);
      expect(toast.type).toBe(testType);
      done();
    });

    service.showToast(testMessage, testType);
  });

  it('should emit toast message with warning type', (done) => {
    const testMessage = 'Warning message';
    const testType: Toast['type'] = 'warning';

    service.toastState.subscribe((toast: Toast) => {
      expect(toast.message).toBe(testMessage);
      expect(toast.type).toBe(testType);
      done();
    });

    service.showToast(testMessage, testType);
  });
});
