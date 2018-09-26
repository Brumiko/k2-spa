import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { conf } from '../../conf';
import { MjesnostCl } from '../../_models/hvk/mjesnost-cl.model';

@Injectable({
    providedIn: 'root'
})
export class MjesnostClService {
    CLAN_PATH: string = 'clanovi/';
    MJESNOST_PATH: string = 'mjesnost/';

    constructor(private http: HttpClient) { }

    getMjesnost(username: string): Observable<MjesnostCl[]> {
        return this.http.get<MjesnostCl[]>(`${conf.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.MJESNOST_PATH}`);
    }
}
