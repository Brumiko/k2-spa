import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { PO } from '../../_models/hvk/po.model';
import { PoAutocompleteService } from '../../_services/hvk/_po-autocomplete.service';

@Component({
    selector: 'app-po-autocomplete',
    templateUrl: './po-autocomplete.component.html',
})
export class PoAutocompleteComponent {
    @Input() ref: FormGroup;
    searching = false;
    searchFailed = false;

    constructor(private poAcompliSVC: PoAutocompleteService) { }

    search = (text$: Observable<string>) => text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.searching = true),
        switchMap(term => this.poAcompliSVC.search(term).pipe(
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

    inputFormatter = (item: PO) => {
        if (item) {
            return item.naziv;
        } else {
            return '';
        }
    };

    resultFormatter = (item: PO) => {
        if (item) {
            if (item) {
                return `${item.naziv}, ${item.oib}`;
            } else {
                return '';
            }
        }
    }
}