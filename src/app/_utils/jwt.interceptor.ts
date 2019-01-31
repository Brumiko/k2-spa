import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

/**
 * Klasa za dopunu odlaznih HTTP zahtjeva autentikacijskim tokenom (JWT).
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    /**
     * Hvata sve odlazne HTTP zahtjeve (requests) i dopunjuje ih autorizacijskim tokenom (JWT).
     * @param request Odlazni HTTP zahtjev za dopuniti autentikacijskim tokenom.
     * @param next HTTP handler za obradi zahtjeva.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) { // Dodaje autorizacijsko zaglavlje ako je korisnik prijavljen JWT autentikacijom.
            request = request.clone({
                setHeaders: {
                    Authorization: `JWT ${currentUser.token}`
                }
            });
        }
        return next.handle(request);
    }
}