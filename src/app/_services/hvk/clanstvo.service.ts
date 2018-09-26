import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clanstvo } from '../../_models/hvk/clanstvo.model';
import { conf } from '../../conf';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClanstvoService {
    CLAN_PATH: string = 'clanovi/';
    CLANSTVO_PATH: string = 'clanstvo/';

  constructor(private http: HttpClient) { }

  getClanstvo(username: string): Observable<Clanstvo[]> {
      return this.http.get<Clanstvo[]>(`${conf.HVK_WEB_API_URL}${this.CLAN_PATH}${username}/${this.CLANSTVO_PATH}`);
  }
}
