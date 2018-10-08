import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { Katalog } from '../../_models/hvk/katalog.model';
import { NkzAutocompleteService } from '../../_services/hvk/_nkz-autocomplete.service';

@Component({
    selector: 'app-nkz-autocomplete',
    templateUrl: './nkz-autocomplete.component.html',
})
export class NkzAutocompleteComponent {
    @Input() ref: FormGroup;
    searching = false;
    searchFailed = false;

    constructor(private nkzAcompliSVC: NkzAutocompleteService) { }

    search = (text$: Observable<string>) => text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.searching = true),
        switchMap(term => this.nkzAcompliSVC.search(term).pipe(
            tap(data => {
                this.searchFailed = false;
                //console.log(data);
            }),
            catchError(() => {
                this.searchFailed = true;
                return of([]);
            }))
        ),
        tap(() => this.searching = false)
    );

    inputFormatter = (item: Katalog) => {
        if (item) {
            return item.naziv;
        } else {
            return '';
        }
    };

    resultFormatter = (item: Katalog) => {
        if (item) {
            if (item) {
                return ` ${item.ozn} ${item.naziv}`;
            } else {
                return '';
            }
        }
    }
}