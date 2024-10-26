import { Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { catchError, Observable , throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { CategoryRequest } from 'src/app/core/model/category-request.model';
import { CategoryResponse} from 'src/app/core/model/category-response';
import { Pagination } from '@model/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly CategoryUrl = environment.stokApi;
  private readonly token = environment.token;
  private errorMessage: string = '';

  constructor(private readonly http: HttpClient) { }

  getCategories(page: number, size: number, sortDirection: string): Observable<Pagination<CategoryResponse[]>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    const params = new HttpParams().set('page', page).set('size', size).set('sortDirection', sortDirection);
    return this.http.get<Pagination<CategoryResponse[]>>(`${this.CategoryUrl}/category/all`, { headers, params });
   }

  saveCategory(category: CategoryRequest): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<void>(`${this.CategoryUrl}/category/save`, category, { headers }).pipe(catchError(this.getError.bind(this))
    );
  }

  private getError(error: HttpErrorResponse) {
    const status = error.status;
    if (status === 401 || status === 403) {
    this.errorMessage = 'You are not authorized to perform this action';
    }
    if(status === 400) {
      this.errorMessage = 'Category already exists';
    }
    return throwError(() => error);
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
