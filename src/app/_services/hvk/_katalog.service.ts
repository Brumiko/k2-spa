import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Katalog } from '../../_models/hvk/katalog.model';
import { conf } from '../../conf';
import { KatalogEnum } from '../../_models/local/katalog.enum';

@Injectable({
    providedIn: 'root'
})
export class KatalogService {

    constructor(private http: HttpClient) { }

    getList(which: KatalogEnum): Observable<Katalog[]> { // RIJEŠI CORS na Web API-ju!
        return this.http.get<Katalog[]>(`${conf.HVK_WEB_API_URL}${which}`);        
    }
}