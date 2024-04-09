import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private _authService: AuthService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const headersToAppend: HttpHeaders = new HttpHeaders();
    const authToken = this._authService.getToken;

    // Here check if the request has the header already
    if(!req.headers.has('Authorization')) {
       headersToAppend.set('Authorization', `Bearer ${authToken}`);
    }
    if (!req.headers.has('api_key')) {
      headersToAppend.set('api_key', 'CC0BCCFC-02C7-4A4A-937B-0F68BDCA17AA');
    }

    req = req.clone({
      headers: headersToAppend
    });

    return next.handle(req);
  }

}
