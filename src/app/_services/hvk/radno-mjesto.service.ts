import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { conf } from '../../conf';
import { environment } from '../../../environments/environment';
import { RadnoMjesto } from '../../_models/hvk/radno-mjesto.model';

/**
 * Servis za rad s podacima o radnom mjestu člana.
 */
@Injectable({
    providedIn: 'root'
})
export class RadnoMjestoService {
    CLAN_PATH: string = 'clanovi/';
    RADMJE_PATH: string = 'radna-mjesta/'

    constructor(private http: HttpClient) { }

    /**
     * Dohvat popisa svih radnih mjesta određenog člana.
     * @param username Korisničko ime člana.
     */
    getRadnaMjesta(username: string): Observable<RadnoMjesto[]> {
        return this.http.get<RadnoMjesto[]>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.RADMJE_PATH}`);
    }

    /**
     * Dohvat specifičnog radnog mjesta određenog člana.
     * @param username Korisničko ime člana.
     * @param id ID radnog mjesta.
     */
    getRadnoMjestoById(username: string, id: number): Observable<RadnoMjesto> {
        return this.http.get<RadnoMjesto>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.RADMJE_PATH}${id}/`);
    }

    /**
     * Upis radnog mjesta člana.
     * @param username Korisničko ime člana.
     * @param radMje Objekt tipa Radno Mjesto za upis.
     */
    addRadnoMjesto(username: string, radMje: RadnoMjesto): Observable<RadnoMjesto> {
        return this.http.post<RadnoMjesto>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.RADMJE_PATH}`, radMje, conf.HTTP_OPTIONS_JSON);
    }

    /**
     * Ažuriranje radnog mjesta člana.
     * @param username Korisničko ime člana.
     * @param radMje Objekt tipa Radno Mjesto s ažuriranim podacima.
     */
    updateRadnoMjesto(username: string, radMje: RadnoMjesto): Observable<RadnoMjesto> {
        return this.http.put<RadnoMjesto>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.RADMJE_PATH}${radMje.id}/`, radMje, conf.HTTP_OPTIONS_JSON);
    }

    /**
     * Brisanje radnog mjesta člana.
     * @param username Korisničko ime člana.
     * @param radMje Objekt tipa radno mjesto za brisanje ili ID radnog mjesta.
     */
    deleteRadnoMjesto(username: string, radMje: RadnoMjesto | number): Observable<RadnoMjesto> {
        const id = typeof radMje === 'number' ? radMje : radMje.id;
        return this.http.delete<RadnoMjesto>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.RADMJE_PATH}${id}/`, conf.HTTP_OPTIONS_JSON);
    }
}
