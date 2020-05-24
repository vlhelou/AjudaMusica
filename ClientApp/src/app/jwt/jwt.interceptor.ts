import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UsuarioService } from '../Services/usuario.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private srv: UsuarioService) { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.srv.currentUserValue;
        if (currentUser && currentUser.Token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.Token}`
                }
            });
        }
        return next.handle(request);
    }
}
