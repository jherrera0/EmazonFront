import { Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryRequest } from 'src/app/core/model/category-request.model';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private CategoryUrl = environment.stokApi;
  private token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQURNSU4iLCJJZCI6MSwic3ViIjoiam9zZUBnbWFpbC5jb20iLCJpYXQiOjE3Mjg0MjgxMTYsImV4cCI6MTcyODQyOTkxNn0.KjRZLeQ5btj_HX8Ba4uznJYUCa0VZlI0_pPcjDGryh4";
  private errorMessage: string = '';

  constructor(private http: HttpClient) { }
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
