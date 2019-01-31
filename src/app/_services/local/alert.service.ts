import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject, } from 'rxjs';

/**
 * Servis koji omogućuje prikazivanje poruka bilo kojoj Komponenti.
 * Mmora biti u definiran pružateljima (providers): app-module > providers.
 * (Poruke prikazuje komponenta Alert.)
 */
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private subject = new Subject<any>(); // Subject preuzima dojave iz jednog Observablea i prosljeđuje ih do jednog ili više promatrača.
    private keepAfterRouteChange = false;

    /**
     * Konstruktor.
     * Pri promjeni rute prazni spremnik upozorenja.
     * @param router Referenca na Ruter.
     */
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

    /**
     * Stvara poruku o uspjehu.
     * @param message Poruka o uspjehu.
     * @param keepAfterRouteChange True ako poruku treba prikazati i nekon promjene rute,
     * inače false.
     */
    success(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({
            type: 'success', result: message
        });
    }

    /**
     * Stvara poruku o greški.
     * @param error Poruka o greški.
     * @param keepAfterRouteChange True ako poruku treba prikazati i nekon promjene rute,
     * inače false.
     */
    error(error: any, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({
            type: 'error', result: error
        });
    }

    /**
     * Čisti spremnik upozorenja.
     */
    clear() {
        this.subject.next();
    }

    /**
     * Vraća Observable ovoga servisa.
     * Taj Observable potom koristi Alert komponenta 
     * za pretplatu na notifikacije za pristizanje i prikaz nove poruke.
     */
    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
}