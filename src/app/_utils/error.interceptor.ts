import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

import { catchError } from "rxjs/operators";
import { AlertService } from "../_services/local/alert.service";
import { AuthenticationService } from "../_services/auth/authentication.service";

/*
Hvata sve greške sa servera (Web API-ja). 
Na 401 Unauthorized odjavljuje korisnika.
Sve ostale greške Web API-ja baca dalje kako bi u konačnici bile prikazane korisnuku.
*/
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private alertSVC: AlertService, private authSVC: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) { // Automatska odjava ako je HTTP status 401 'Unauthorized'.
                    this.authSVC.logout();
                    location.reload(true);
                }
                return throwError(error); // Baci IZVORNU grešku sa SVIM điđama!
            })
        );
    }
}