import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ArticleRequest } from '@model/article-request.model';
import { Pagination } from '@model/pagination.model';
import { ArticleResponse } from '@model/article-response.model';

  describe('ArticleService', () => {
    let service: ArticleService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ArticleService]
      });
      service = TestBed.inject(ArticleService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should save an article', () => {
      const dummyArticle: ArticleRequest = { name: 'test', description: 'test', price: 10, stock: 10 , categoriesId: [1, 2], brandId: 1 };
      service.saveArticle(dummyArticle).subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`${environment.stokApi}/article/save`);
      expect(req.request.method).toBe('POST');
      req.flush(null);
    });

    it('should handle 401 error', () => {
      const dummyArticle: ArticleRequest = { name: 'test', description: 'test', price: 10, stock: 10 , categoriesId: [1, 2], brandId: 1  };
      service.saveArticle(dummyArticle).subscribe({
        next: () => fail('should have failed with 401 error'),
        error: (error: HttpErrorResponse) => {
          expect(service.getErrorMessage()).toBe('You are not authorized to perform this action');
          expect(error.status).toBe(401);
        }
      });

      const req = httpMock.expectOne(`${environment.stokApi}/article/save`);
      req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    });

    it('should handle 409 error', () => {
      const dummyArticle: ArticleRequest = {name: 'test', description: 'test', price: 10, stock: 10 , categoriesId: [1, 2], brandId: 1  };
      service.saveArticle(dummyArticle).subscribe({
        next: () => fail('should have failed with 409 error'),
        error: (error: HttpErrorResponse) => {
          expect(service.getErrorMessage()).toBe('article already exists');
          expect(error.status).toBe(409);
        }
      });

      const req = httpMock.expectOne(`${environment.stokApi}/article/save`);
      req.flush('Conflict', { status: 409, statusText: 'Conflict' });
    });

    it('should get articles', () => {
      service.getArticles(1, 10, 'asc', 'name').subscribe((response: Pagination<ArticleResponse[]>) => {
        expect(response).toBeDefined();
      });

      const req = httpMock.expectOne(`${environment.stokApi}/article/all?page=1&size=10&sortDirection=asc&sortBy=name`);
      expect(req.request.method).toBe('GET');
      req.flush(null);
    });

  });
