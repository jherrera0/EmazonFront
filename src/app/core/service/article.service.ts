import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ArticleRequest } from '@model/article-request.model';
import { ArticleResponse} from '@model/article-response.model';
import { Pagination } from '@model/pagination.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly CategoryUrl = environment.stokApi;
  private readonly token = environment.token;
  private errorMessage: string = '';

  constructor(private readonly http:HttpClient) { }

  getArticles(page: number, size: number, sortDirection: string,sortBy:string): Observable<Pagination<ArticleResponse[]>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    const params = new HttpParams().set('page', page).set('size', size).set('sortDirection', sortDirection).set('sortBy',sortBy);
    return this.http.get<Pagination<ArticleResponse[]>>(`${this.CategoryUrl}/article/all`, { headers, params}).pipe(catchError(this.getError.bind(this)));
  }

  saveArticle(article: ArticleRequest): Observable<void> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });
  return this.http.post<void>(`${this.CategoryUrl}/article/save`, article, { headers }).pipe(catchError(this.getError.bind(this)));
  }

  private getError(error: HttpErrorResponse) {
    this.errorMessage = error.error.message;
    return throwError(() => error);
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
