import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { conf } from '../../conf';
import { environment } from '../../../environments/environment';
import { RadnoMjesto } from '../../_models/hvk/radno-mjesto.model';

@Injectable({
    providedIn: 'root'
})
export class RadnoMjestoService {
    CLAN_PATH: string = 'clanovi/';
    RADMJE_PATH: string = 'radna-mjesta/'

    constructor(private http: HttpClient) { }

    getRadnaMjesta(username: string): Observable<RadnoMjesto[]> {
        return this.http.get<RadnoMjesto[]>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.RADMJE_PATH}`);
    }

    getRadnoMjestoById(username: string, id: number): Observable<RadnoMjesto> {
        return this.http.get<RadnoMjesto>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.RADMJE_PATH}${id}/`);
    }

    addRadnoMjesto(username: string, radMje: RadnoMjesto): Observable<RadnoMjesto> {
        return this.http.post<RadnoMjesto>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.RADMJE_PATH}`, radMje, conf.HTTP_OPTIONS_JSON);
    }

    updateRadnoMjesto(username: string, radMje: RadnoMjesto): Observable<RadnoMjesto> {
        return this.http.put<RadnoMjesto>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.RADMJE_PATH}${radMje.id}/`, radMje, conf.HTTP_OPTIONS_JSON);
    }

    deleteRadnoMjesto(username: string, radMje: RadnoMjesto | number): Observable<RadnoMjesto> {
        const id = typeof radMje === 'number' ? radMje : radMje.id;
        return this.http.delete<RadnoMjesto>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.RADMJE_PATH}${id}/`, conf.HTTP_OPTIONS_JSON);
    }
}
