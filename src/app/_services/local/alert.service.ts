import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject, } from 'rxjs';

/*
Ovaj Servis omogućuje prikazivanje poruka bilo kojoj Komponenti. Zato Servis mora biti u pružateljima: app-module > providers
Poruke se prikazuju komponentom Alert.
*/
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private subject = new Subject<any>(); // Subject preuzima dojave iz jednog Observablea i prosljeđuje ih do jednog ili više promatrača.
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        router.events.subscribe( // Pri promjeni rute počisti upozorenja.
            event => {
                if (event instanceof NavigationStart) {
                    if (this.keepAfterRouteChange) {
                        this.keepAfterRouteChange = false;
                    } else { // Počisti upozorenja.
                        this.subject.next();
                    }
                }
            }
        )
    }

    success(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({
            type: 'success', result: message
        });
    }

    error(error: any, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({
            type: 'error', result: error
        });
    }

    clear() {
        this.subject.next();
    }

    // Vraća Observable kojega potom koristi Alert komponenta za pretplatu na notifikacije za pristizanje i prikaz nove poruke.
    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
}