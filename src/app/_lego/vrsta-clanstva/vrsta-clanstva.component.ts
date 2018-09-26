import { Component, OnInit, Input } from '@angular/core';
import { Katalog } from '../../_models/hvk/katalog.model';
import { KatalogService } from '../../_services/hvk/_katalog.service';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../../_services/local/alert.service';
import { KatalogEnum } from '../../_models/local/katalog.enum';

@Component({
    selector: 'app-vrsta-clanstva',
    templateUrl: './vrsta-clanstva.component.html',
})
export class VrstaClanstvaComponent implements OnInit {
    @Input() ref: FormGroup;
    katalog: Katalog[];

    constructor(private svc: KatalogService, private alertSVC: AlertService) { }

    ngOnInit() {
        this.svc.getList(KatalogEnum.VRSTA_CLANSTVA).subscribe(
            items => { this.katalog = items; },
            error => { this.alertSVC.error(error); }
        );
    }
}
