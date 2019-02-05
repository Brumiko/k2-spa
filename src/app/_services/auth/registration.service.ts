import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { conf } from '../../conf';
import { environment } from '../../../environments/environment';
import { Registration } from '../../_models/auth/registration.model';

/**
 * Prilagođeni registracijski servis.
 * Uz klasične registracijske radnje, obavlja provjeru podataka na simuliranom MUP-ovom web-servisu.
 */
@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private http: HttpClient) { }

    /**
     * Prosljeđuje zahtjev za registracijom na odgovarajuću metodu web-API-ja.
     * @param user Korisnički podaci za registraciju. 
     * Provjeravaju se na simuliranom MUP-ovom web-servisu
     * koji je dio J2I (javne informacijske infrastrukture).
     */
    register(user: Registration) {
        return this.http.post(`${environment.REST_AUTH_URL}${conf.RA_REGISTER}`, user, conf.HTTP_OPTIONS_JSON);
    }
}