import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { CategoryRequest } from 'src/app/core/model/category-request.model';
import { environment } from '@environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform POST request in saveCategory', () => {
    const category: CategoryRequest = { name: 'Test Category', description: 'Test Description' };

    service.saveCategory(category).subscribe();

    const req = httpMock.expectOne(`${service['CategoryUrl']}/category/save`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service['token']}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(null);
  });

  it('should return error message from getErrorMessage', () => {
    service['errorMessage'] = 'Test error message';
    expect(service.getErrorMessage()).toBe('Test error message');
  });

  it('should fetch categories with pagination', () => {
    const mockResponse = {
      items: [{ id: 1, name: 'Category 1' }],
      totalItems: 1,
      totalPages: 1,
      currentPage: 0
    };

    service.getCategories(0, 10, 'asc').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['CategoryUrl']}/category/all?page=0&size=10&sortDirection=asc`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle errors', () => {
    const brandRequest: CategoryRequest = { name: 'Test Brand', description: 'Test Description' };
    service.saveCategory(brandRequest).subscribe({
      error: (error) => {
        expect(service.getErrorMessage()).toBe('You are not authorized to perform this action');
      }
    });

    const req = httpMock.expectOne(`${environment.stokApi}/category/save`);
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should handle 409 error', () => {
    const brandRequest: CategoryRequest= { name: 'Test Brand', description: 'Test Description' };
    service.saveCategory(brandRequest).subscribe({
      error: (error) => {
        expect(service.getErrorMessage()).toBe('Brand already exists');
      }
    });

    const req = httpMock.expectOne(`${environment.stokApi}/category/save`);
    req.flush('Conflict', { status: 409, statusText: 'Conflict' });
  });
});
