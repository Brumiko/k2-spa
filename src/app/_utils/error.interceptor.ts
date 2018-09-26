import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

import { catchError } from "rxjs/operators";
import { AlertService } from "../_services/local/alert.service";

/*
Hvata sve greške sa servera (Web API-ja). 
Na 401 Unauthorized odjavljuje korisnika.
Sve ostale greške Web API-ja baca dalje kako bi u konačnici bile prikazane korisnuku.
*/
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private alertSVC: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) { // Automatska odjava ako je HTTP status 401 'Unauthorized'.
                    //this.authSVC.logout();
                    //location.reload();
                    this.alertSVC.error(error, true); // ZAMMJENA: Podigni upozorenje i obavi odjavu u alert komponenti.
                }
                return throwError(error); // Baci IZVORNU grešku sa SVIM điđama!
            })
        );
    }
}