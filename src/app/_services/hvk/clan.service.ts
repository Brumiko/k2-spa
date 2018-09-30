import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Clan } from '../../_models/hvk/clan.model';

@Injectable({
    providedIn: 'root'
})
export class ClanService {
    CLAN_PATH: string = 'clanovi/'

    constructor(private http: HttpClient) { }

    getClan(username: string): Observable<Clan> {
        return this.http.get<Clan>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/`);
        //return this.http.get<Clan>(`${conf.HVK_WEB_API_URL}${this.CLAN_PATH}mis/`); // Za testiranje.
    }

    updatePortrait(username: string, portrait: FormData): Observable<Clan> {
        return this.http.put<Clan>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/`, portrait);
    }
}