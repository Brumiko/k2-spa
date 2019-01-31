import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

import { map } from 'rxjs/operators';

import { conf } from '../../conf';
import { environment } from '../../../environments/environment';

/**
 * Autentikacijski servis s metodama za prijavu i odjavu (uključivo i serversku odjavu).
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    @Output() newLogin: EventEmitter<any> = new EventEmitter();

    constructor(private http: HttpClient) { }

    /**
     * POST metoda za prijavu. 
     * Očekuje username i/ili email i lozinku.
     * Vraća autentikacijski token i objekt user(pk, username, first_name, last_name); first_name i last_name mogu biti prazni.
     * @param username Korisničko ime (ne koristimo email za prijavu).
     * @param password Lozinka.
     */
    login(username: string, password: string) { // POST: username ili email, password; token, user (pk, username, first_name "", last_name "")
        return this.http.post<any>(`${environment.REST_AUTH_URL}${conf.RA_LOGIN}`, { username: username, password: password }, conf.HTTP_OPTIONS_JSON).pipe(
            map(currentUser => {
                if (currentUser && currentUser.token) {
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    this.newLogin.emit(currentUser.user.username); // REST AUTH vraća samo token.
                }
                else {
                    this.newLogin.emit(null);
                }
                return currentUser;
            })
        );
    }

    /**
     * POST metoda za odjavu. Odjava se provodi i lokalno, brisanjem autentikacijskog tokena iz local storage, i udaljeno, 
     */
    logout() { // POST: nikaj
        localStorage.removeItem('currentUser');
        this.newLogin.emit(null);
        /*
        return this.http.post<any>(`${conf.REST_AUTH_URL}${conf.RA_LOGOUT}`, '', conf.HTTP_OPTIONS_JSON).pipe(
            tap(data => {
                this.newLogin.emit(null);
            })
        );
        */
       // Opcionalno, ako prođe - prođe.
       this.http.post<any>(`${environment.REST_AUTH_URL}${conf.RA_LOGOUT}`, '', conf.HTTP_OPTIONS_JSON);
    }
}