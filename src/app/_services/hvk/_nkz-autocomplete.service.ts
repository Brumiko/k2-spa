import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Katalog } from '../../_models/hvk/katalog.model';
import { conf } from '../../conf';

@Injectable({
    providedIn: 'root'
})
export class NkzAutocompleteService {
    AUTOCOMPLETE_PATH: string = 'autocomplete_nkz/?find='

    constructor(private http: HttpClient) { }

    search(term: string): Observable<Katalog[]> {
        if (term.length < 2) {
            return of([]);
        }
        return this.http.get<Katalog[]>(`${conf.HVK_WEB_API_URL}${this.AUTOCOMPLETE_PATH}${term}`);
    }
}
