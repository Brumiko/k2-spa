import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Clan } from '../../_models/hvk/clan.model';
import { MjesnostCl } from '../../_models/hvk/mjesnost-cl.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClanService } from '../../_services/hvk/clan.service';
import { AlertService } from '../../_services/local/alert.service';
import { MjesnostClService } from '../../_services/hvk/mjesnost-cl.service';

@Component({
    selector: 'app-profil-osnovno',
    templateUrl: './profil-osnovno.component.html',
})
export class ProfilOsnovnoComponent implements OnInit {
    @Input() clan: Clan;
    @Input() loadData = false;
    @Output() onImageChange = new EventEmitter<number>();

    loading = false;
    submitted = false;

    mjesnostLST: MjesnostCl[];
    file;
    form: FormGroup
    get f() { return this.form.controls; }

    constructor(
        private alertSVC: AlertService,
        private clanSVC: ClanService,
        private formBuilder: FormBuilder,
        private mjesnostSVC: MjesnostClService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            file: ''
        });
        if (this.loadData) {
            this.mjesnostSVC.getMjesnost(this.clan.py_user).subscribe(
                item => { this.mjesnostLST = item; },
                error => { this.alertSVC.error(error); }
            );
        }
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        }
    }

    onSubmit() {
        this.loading = true;

        let formData: FormData = new FormData();
        formData.append('slika', this.file)

        this.clanSVC.updatePortrait(this.clan.py_user, formData).subscribe(
            data => {
                this.clan.slika = data.slika;
                this.onImageChange.emit(new Date().getTime());
            },
            error => { this.alertSVC.error(error); }
        );

        this.loading = false;
    }

    onDelete() {
        this.loading = true;
        alert('Brisanje slike još nije podržano!');
        this.loading = false;
    }
}