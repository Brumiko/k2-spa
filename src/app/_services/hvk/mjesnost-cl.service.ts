import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MjesnostCl } from '../../_models/hvk/mjesnost-cl.model';

@Injectable({
    providedIn: 'root'
})
export class MjesnostClService {
    CLAN_PATH: string = 'clanovi/';
    MJESNOST_PATH: string = 'mjesnost/';

    constructor(private http: HttpClient) { }

    getMjesnost(username: string): Observable<MjesnostCl[]> {
        return this.http.get<MjesnostCl[]>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.MJESNOST_PATH}`);
    }
}
