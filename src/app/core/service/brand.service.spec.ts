import { Pagination } from '@model/pagination.model';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandService } from './brand.service';
import { BrandRequest } from '@model/brand-request.model';
import { environment } from '@environments/environment';
import { BrandResponse} from '@model/brand-response.model';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService]
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save a brand', () => {
    const brandRequest: BrandRequest = { name: 'Test Brand' , description: 'Test Description'};
    service.saveBrand(brandRequest).subscribe();

    const req = httpMock.expectOne(`${environment.stokApi}/brand/save`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.token}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(null);
  });

  it('should handle 401 error', () => {
    const brandRequest: BrandRequest = { name: 'Test Brand', description: 'Test Description' };
    service.saveBrand(brandRequest).subscribe({
      error: (error) => {
        expect(service.getErrorMessage()).toBe('You are not authorized to perform this action');
      }
    });

    const req = httpMock.expectOne(`${environment.stokApi}/brand/save`);
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should handle 409 error', () => {
    const brandRequest: BrandRequest = { name: 'Test Brand', description: 'Test Description' };
    service.saveBrand(brandRequest).subscribe({
      error: (error) => {
        expect(service.getErrorMessage()).toBe('Brand already exists');
      }
    });

    const req = httpMock.expectOne(`${environment.stokApi}/brand/save`);
    req.flush('Conflict', { status: 409, statusText: 'Conflict' });
  });

 it('should get brands with pagination', () => {
      const page = 1;
      const size = 10;
      const sortDirection = 'asc';
      const mockResponse: Pagination<BrandResponse[]> = {
        items: [{ id: 1, name: 'Test Brand', description: 'Test Description' }],
        currentPage: 1,
        pageSize: 10,
        totalPages: 1
      };

      service.getBrands(page, size, sortDirection).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.stokApi}/brand/all?page=${page}&size=${size}&sortDirection=${sortDirection}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.token}`);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(mockResponse);
    });
});
