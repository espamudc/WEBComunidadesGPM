// app/auth/token.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import 'rxjs/add/operator/do';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/do';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService
    ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let csrftoken = this.cookieService.get('csrftoken')
    
    let jwttoken = localStorage.getItem('token')
   // let jwttoken = this.cookieService.get('jwttoken')
   if(!request['url'].includes('ValidarCorreo') && !request['url'].includes('Login')){
    request = request.clone({
      setHeaders: {
        // This is where you can use your various tokens
        Authorization: `Bearer ${jwttoken}`,
        // 'X-CSRFToken': `${csrftoken}`
      }
    });
   }
  
    
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
      
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          console.log("handle error here")
          
        }
      }
    });
  }
}