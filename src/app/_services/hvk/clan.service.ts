import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Clan } from '../../_models/hvk/clan.model';

/**
 * Servis za rad s osnovnim članskim podacima.
 */
@Injectable({
    providedIn: 'root'
})
export class ClanService {
    CLAN_PATH: string = 'clanovi/'

    constructor(private http: HttpClient) { }

    /**
     * Dohvaća (GET) osnovne podatke o članu.
     * @param username Korisničko ime člana čije osnovne podatke treba dohvatiti.
     */
    getClan(username: string): Observable<Clan> {
        return this.http.get<Clan>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/`);
        //return this.http.get<Clan>(`${conf.HVK_WEB_API_URL}${this.CLAN_PATH}mis/`); // Za testiranje.
    }

    /**
     * Ažurira (PUT) korisnikovu sliku.
     * @param username Korisničko ime člana čiji portret treba ažurirati.
     * @param portrait Korisnikova slika (binarija).
     */
    updatePortrait(username: string, portrait: FormData): Observable<Clan> {
        return this.http.put<Clan>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/`, portrait);
    }
}