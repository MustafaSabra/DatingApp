import { RegisterComponent } from './../register/register.component';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
  return next.handle(req).pipe(
      catchError(error => {
          if (error.staus === 401) {
            return throwError(error.statusText);
      }
          if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Application-Error');
          if (applicationError)
          {
              return  throwError(applicationError);
          }
          const serverError = error.error;
          let modelStateErrors = '';
          if (serverError.error && typeof serverError.errors === 'object')
          {
              for (const key in serverError.errors) {
                  if (serverError.error[key]){
                      modelStateErrors += serverError.errors[key] + '\n';
                  }
               }
          }
          return throwError(modelStateErrors || serverError || 'Server Error');
      }
      }
  ));
    //  throw new Error('Method not implemented.');
  }
}
export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
multi : true
};
