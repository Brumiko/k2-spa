import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PO } from '../../_models/hvk/po.model';

@Injectable({
    providedIn: 'root'
})
export class PoAutocompleteService {
    AUTOCOMPLETE_PATH: string = 'autocomplete_po/?find='
    debugPoLST: Observable<PO[]>;

    constructor(private http: HttpClient) { }

    search(term: string): Observable<PO[]> {
        if (term.length < 2) {
            return of([]);
        }
        /*
        this.debugPoLST = this.http.get<PO[]>(`${conf.HVK_WEB_API_URL}${this.AUTOCOMPLETE_PATH}${term}`);
        this.debugPoLST.subscribe(item => console.log(item));
        return this.debugPoLST;
        */
        return this.http.get<PO[]>(`${environment.HVK_WEB_API_URL}${this.AUTOCOMPLETE_PATH}${term}`);
    }
}
