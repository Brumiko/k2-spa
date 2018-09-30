import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { conf } from '../../conf';
import { environment } from '../../../environments/environment';
import { KontaktCl } from '../../_models/hvk/kontakt_cl.model';

@Injectable({
    providedIn: 'root'
})
export class KontaktClService {
    CLAN_PATH: string = 'clanovi/';
    KONTAKT_PATH: string = 'kontakti/';

    constructor(private http: HttpClient) { }

    getKontakti(username: string): Observable<KontaktCl[]> {
        return this.http.get<KontaktCl[]>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.KONTAKT_PATH}`);
    }

    // Treba li ovo?
    getKontaktById(username: string, id: number): Observable<KontaktCl> {
        return this.http.get<KontaktCl>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.KONTAKT_PATH}${id}/`);
    }

    addKontakt(username: string, kontakt: KontaktCl): Observable<KontaktCl> {
        return this.http.post<KontaktCl>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.KONTAKT_PATH}`, kontakt, conf.HTTP_OPTIONS_JSON);
    }

    updateKontakt(username: string, kontakt: KontaktCl): Observable<KontaktCl> {
        return this.http.put<KontaktCl>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.KONTAKT_PATH}${kontakt.id}/`, kontakt, conf.HTTP_OPTIONS_JSON);
    }

    deleteKontakt(username: string, kontakt: KontaktCl | number): Observable<KontaktCl> {
        const id = typeof kontakt === 'number' ? kontakt : kontakt.id;
        return this.http.delete<KontaktCl>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.KONTAKT_PATH}${id}/`, conf.HTTP_OPTIONS_JSON);
    }
}
