import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { AlertService } from '../_services/local/alert.service';
import { Clan } from '../_models/hvk/clan.model';
import { ClanService } from '../_services/hvk/clan.service';
import { conf } from '../conf';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit, AfterViewChecked {
    loading = false;
    submitted = false;

    @ViewChild('tabset') private tabset: NgbTabset;
    selectedTab: string;
    ts: string;

    dohvatNaslovnice = false;
    dohvatClanstva = false;
    dohvatKontakata = false;
    dohvatRadMje = false;

    clan: Clan;
    imgPlaceholder = conf.IMG_PLACEHOLDER_URL;

    constructor(
        private alertSVC: AlertService,
        private clanSVC: ClanService,
        private activeRoute: ActivatedRoute,
        private router: Router
    ) { 
        activeRoute.data.subscribe(
            data => { this.selectedTab = data.name; }
        );
    }

    ngOnInit() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.clanSVC.getClan(currentUser.user.username).subscribe(
            item => { this.clan = item; },
            error => { this.alertSVC.error(error); },
        );

        switch (this.activeRoute.snapshot.data['name']) {
            case 'naslovnica': {
                this.dohvatNaslovnice = true;    
                break;
            }
            case 'clanstvo': {
                this.dohvatClanstva = true;
            }
            case 'kontakti': {
                this.dohvatKontakata = true;
                break;
            }
            case 'radna-mjesta': {
                this.dohvatRadMje = true;
            }
        }
    }

    ngAfterViewChecked() {
        if (this.tabset) {
            this.tabset.select(this.selectedTab);
        }
    }

    onTabChange($event: NgbTabChangeEvent) {
        this.router.navigateByUrl(`/profil/${[$event.nextId]}`);
    }

    onImageChange($event: any) {
        this.ts = $event;
    }
}