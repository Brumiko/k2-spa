import { Component, OnInit, Input } from '@angular/core';
import { Clan } from '../../_models/hvk/clan.model';
import { ClanstvoService } from '../../_services/hvk/clanstvo.service';
import { Clanstvo } from '../../_models/hvk/clanstvo.model';
import { AlertService } from '../../_services/local/alert.service';

@Component({
    selector: 'app-profil-clanstvo',
    templateUrl: './profil-clanstvo.component.html',
})
export class ProfilClanstvoComponent implements OnInit {
    @Input() clan: Clan;
    @Input() loadData = false;

    clanstvoLST: Clanstvo[];

    constructor(
        private alertSVC: AlertService,
        private clanstvoSVC: ClanstvoService
    ) { }

    ngOnInit() {
        if (this.loadData) {
            this.clanstvoSVC.getClanstvo(this.clan.py_user).subscribe(
                item => { this.clanstvoLST = item; },
                error => { this.alertSVC.error(error); }
            );
        }
    }
}