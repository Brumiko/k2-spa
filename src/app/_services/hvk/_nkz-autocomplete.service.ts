import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Katalog } from '../../_models/hvk/katalog.model';

/**
 * Servis za pretragu zvanja (NKZ).
 */
@Injectable({
    providedIn: 'root'
})
export class NkzAutocompleteService {
    AUTOCOMPLETE_PATH: string = 'autocomplete_nkz/?find='

    constructor(private http: HttpClient) { }

    /**
     * Dohvaća (GET) popis zvanja po dijelu naziva ako dio naziva sadrži barem dva znaka.
     * @param term Dio naziva zvanja.
     */
    search(term: string): Observable<Katalog[]> {
        if (term.length < 2) {
            return of([]);
        }
        return this.http.get<Katalog[]>(`${environment.HVK_WEB_API_URL}${this.AUTOCOMPLETE_PATH}${term}`);
    }
}
