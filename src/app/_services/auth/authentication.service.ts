import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { conf } from '../../conf';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    @Output() newLogin: EventEmitter<any> = new EventEmitter();

    constructor(private http: HttpClient) { }

    login(username: string, password: string) { // POST: username ili email, password; token, user (pk, username, first_name "", last_name "")
        return this.http.post<any>(`${conf.REST_AUTH_URL}${conf.RA_LOGIN}`, { username: username, password: password }, conf.HTTP_OPTIONS_JSON).pipe(
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

    logout() { // POST: nikaj
        localStorage.removeItem('currentUser');
        return this.http.post<any>(`${conf.REST_AUTH_URL}${conf.RA_LOGOUT}`, '', conf.HTTP_OPTIONS_JSON).pipe(
            tap(_ => {
                this.newLogin.emit(null);
            })
        );
    }
}