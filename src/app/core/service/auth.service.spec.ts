import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserRequest } from '@model/user-request.model';
import { environment } from '@environments/environment';
describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AuthService]
      });
      service = TestBed.inject(AuthService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should perform POST request in createAuxWarehouse', () => {
      const auxWarehouse: UserRequest = { name: 'Test user',lastName: 'Test user', document: '123456', email: 'tesr@test.com',phone: '123456',password: '123456',birthDate: new Date('2021-09-01')};

      service.createAuxWarehouse(auxWarehouse).subscribe();

      const req = httpMock.expectOne(`${service['authUrl']}/createAssWarehouse`);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service['token']}`);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(null);
    });

    it('should return the error message', () => {
      const errorMessage = 'Test error message';
      (service as any).errorMessage = errorMessage;
      expect(service.getErrorMessage()).toBe(errorMessage);
    });

    it('should return error message from getErrorMessage', () => {
      service['errorMessage'] = 'Test error message';
      expect(service.getErrorMessage()).toBe('Test error message');
    });

    it('should return an empty string if no error message is set', () => {
      expect(service.getErrorMessage()).toBe('');
    });

    it('should handle errors', () => {
      const auxWarehouse: UserRequest = { name: 'Test user',lastName: 'Test user', document: '123456', email: 'tesr@test.com',phone: '123456',password: '123456',birthDate: new Date('2021-09-01')};
      service.createAuxWarehouse(auxWarehouse).subscribe({
        error: (error) => {
          expect(service.getErrorMessage()).toBe('You are not authorized to perform this action');
        }
      });

      const req = httpMock.expectOne(`${environment.authApi}/createAssWarehouse`);
      req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    });

  });

