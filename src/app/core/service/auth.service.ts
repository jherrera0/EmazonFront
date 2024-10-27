import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UserRequest } from '@model/user-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = environment.authApi;
  private readonly token = environment.token
  private errorMessage: string = '';
  constructor(private readonly http:HttpClient) { }

  createAuxWarehouse(warehouse: UserRequest): Observable<void> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
    return this.http.post<void>(`${this.authUrl}/createAssWarehouse`, warehouse, { headers }).pipe(catchError(this.getError.bind(this)));
  }

  private getError(error: HttpErrorResponse) {
    this.errorMessage = error.error;
    return throwError(() => error);
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
