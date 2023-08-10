import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@Injectable()
export class ExampleInterceptorInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private authService: AuthService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.storageService.isLoggedIn() && this.storageService.getToken()) {
            const request = req.clone({
                headers: new HttpHeaders({
                    'Authorization': "Bearer "+ this.storageService.getToken(),
                })
            });
            return next.handle(request).pipe(
				catchError(err => {
					if(err instanceof HttpErrorResponse && err.status === 401) {
						this.authService.logout();
					}
					return throwError(err);
				})
			);
        }
       
		return next.handle(req);
    }
}
