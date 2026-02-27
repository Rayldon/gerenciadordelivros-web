import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiError } from '../models';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const apiError: ApiError = {
          timestamp: error.error?.timestamp || new Date().toISOString(),
          status: error.status,
          error: error.error?.error || error.statusText,
          message: error.error?.message || error.message || 'Erro desconhecido',
          path: error.error?.path || '',
        };

        return throwError(() => apiError);
      })
    );
  }
}
