import { Component, OnInit, Input } from '@angular/core';
import { Katalog } from '../../_models/hvk/katalog.model';
import { FormGroup } from '@angular/forms';
import { KatalogService } from '../../_services/hvk/_katalog.service';
import { AlertService } from '../../_services/local/alert.service';
import { KatalogEnum } from '../../_models/local/katalog.enum';

@Component({
  selector: 'app-vrsta-kontakta',
  templateUrl: './vrsta-kontakta.component.html',
})
export class VrstaKontaktaComponent implements OnInit {
    @Input() ref: FormGroup;
    @Input() shownInTable: boolean;
    katalog: Katalog[];

  constructor(private svc: KatalogService, private alertSVC: AlertService) { }

  ngOnInit() {
    this.svc.getList(KatalogEnum.VRSTA_KONTAKTA).subscribe(
        items => { this.katalog = items; },
        error => { this.alertSVC.error(error); }
    );
  }
}
