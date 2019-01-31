import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

import { catchError } from "rxjs/operators";
import { AlertService } from "../_services/local/alert.service";
import { AuthenticationService } from "../_services/auth/authentication.service";

/**
 * Klasa za obradu SVIH serverskih greški (koje dojavljuje web-API).
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private alertSVC: AlertService, private authSVC: AuthenticationService) { }

    /**
     * Hvata sve greške sa servera (web-API-ja).
     * Na "401 Unauthorized" odjavljuje korisnika.
     * Sve ostale greške koje dojavi web-API baca dalje kako bi u konačnici bile prikazane korisniku.
     * @param request HTTP zahtjev koji se ispituje na grešku.
     * @param next HTTP handler za obradu greške.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) { // Automatska odjava ako je HTTP status "401 Unauthorized".
                    this.authSVC.logout();
                    location.reload(true);
                }
                return throwError(error); // Baci IZVORNU grešku sa SVIM svojstvima!
            })
        );
    }
}