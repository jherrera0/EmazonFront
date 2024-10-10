import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { CategoryRequest } from 'src/app/core/model/category-request.model';
import { HttpErrorResponse } from '@angular/common/http';

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

  it('should perform POST request in saveCategory', () => {
    const category: CategoryRequest = { name: 'Test Category', description: 'Test Description' };

    service.saveCategory(category).subscribe();

    const req = httpMock.expectOne(`${service['CategoryUrl']}/category/save`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service['token']}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(null);
  });

  it('should handle 401 error in getError', () => {
    const errorResponse = new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized'
    });

    service['getError'](errorResponse);

    expect(service.getErrorMessage()).toBe('You are not authorized to perform this action');
  });

  it('should handle 400 error in getError', () => {
    const errorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request'
    });

    service['getError'](errorResponse);

    expect(service.getErrorMessage()).toBe('Category already exists');
  });

  it('should return error message from getErrorMessage', () => {
    service['errorMessage'] = 'Test error message';
    expect(service.getErrorMessage()).toBe('Test error message');
  });
});
