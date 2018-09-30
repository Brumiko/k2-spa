import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Clanstvo } from '../../_models/hvk/clanstvo.model';

@Injectable({
  providedIn: 'root'
})
export class ClanstvoService {
    CLAN_PATH: string = 'clanovi/';
    CLANSTVO_PATH: string = 'clanstvo/';

  constructor(private http: HttpClient) { }

  getClanstvo(username: string): Observable<Clanstvo[]> {
      return this.http.get<Clanstvo[]>(`${environment.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.CLANSTVO_PATH}`);
  }
}
