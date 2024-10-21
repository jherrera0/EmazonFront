import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ArticleRequest } from '@model/article-request.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly CategoryUrl = environment.stokApi;
  private readonly token = environment.token;
  private errorMessage: string = '';

  constructor(private readonly http:HttpClient) { }

  saveArticle(article: ArticleRequest): Observable<void> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });
  return this.http.post<void>(`${this.CategoryUrl}/article/save`, article, { headers }).pipe(catchError(this.getError.bind(this)));
  }

  private getError(error: HttpErrorResponse) {
    const status = error.status;
    console.log(error);
    if (status === 401 || status === 403) {
      this.errorMessage = 'You are not authorized to perform this action';
    }
    if(status === 409) {
      this.errorMessage = 'article already exists';
    }

    return throwError(() => error);
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
