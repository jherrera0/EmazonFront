import { Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { catchError, Observable , throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryRequest } from 'src/app/core/model/category-request.model';
import { CategoryResponse, PaginationCategory } from 'src/app/core/model/category-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly CategoryUrl = environment.stokApi;
  private readonly token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQURNSU4iLCJJZCI6MSwic3ViIjoiam9zZUBnbWFpbC5jb20iLCJpYXQiOjE3Mjg3NzUwMDQsImV4cCI6MTcyODc3NjgwNH0.jwfnPVFt1QNPpg_MODXMCskohyw1LjYAlVUlkLmuMxY";
  private errorMessage: string = '';

  constructor(private readonly http: HttpClient) { }

  getCategories(page: number, size: number, sortDirection: string): Observable<PaginationCategory<CategoryResponse[]>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    const params = new HttpParams().set('page', page).set('size', size).set('sortDirection', sortDirection);
    return this.http.get<PaginationCategory<CategoryResponse[]>>(`${this.CategoryUrl}/category/all`, { headers, params });
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
    let errorMessage = '';
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
