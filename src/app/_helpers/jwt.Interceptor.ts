import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
    ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let csrftoken = localStorage.getItem('token')
  let request = req;
   if(!req['url'].includes('ValidarCorreo') && !req['url'].includes('Login')){
    if (csrftoken) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ csrftoken }`
        }
      });
    }
   }
  
    
   return next.handle(request).pipe(
    catchError((err: HttpErrorResponse) => {
      //token expirado o token no válido
      if (err.status === 401) {
        this.router.navigateByUrl('/login');
      }
      return throwError( err );

    })
  );
}

}
