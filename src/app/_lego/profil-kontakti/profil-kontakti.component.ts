import { Component, OnInit, Input } from '@angular/core';
import { Clan } from '../../_models/hvk/clan.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { KontaktCl } from '../../_models/hvk/kontakt_cl.model';
import { KontaktClService } from '../../_services/hvk/kontakt-cl.service';
import { AlertService } from '../../_services/local/alert.service';

@Component({
    selector: 'app-profil-kontakti',
    templateUrl: './profil-kontakti.component.html',
})
export class ProfilKontaktiComponent implements OnInit {
    @Input() clan: Clan;
    @Input() loadData = false;

    loading = false;
    submitted = false;

    kontaktLST: KontaktCl[];
    form: FormGroup;
    get f() { return this.form.controls; }

    constructor(
        private alertSVC: AlertService,
        private formBuilder: FormBuilder,
        private kontaktSVC: KontaktClService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({    // 'required' i 'maxLength' validatori su u HTML predlošku!
            contactType: this.formBuilder.group({
                contactType: ''
            }),
            contactContent: '',                 // TODO: kondicionalni validator za e-adresu, tel. brojeve, itd.
        });
        if (this.loadData) {
            this.kontaktSVC.getKontakti(this.clan.py_user).subscribe(
                item => { this.kontaktLST = item; },
                error => { this.alertSVC.error(error); }
            );
        }
    }

    onEdit(id: number) {
        this.loading = true;
        alert('Ažuriranje kontakata još nije podržano. Kontakt možete izbrisati pa opet prepravljenoga upisati.');
        this.loading = false;
    }

    onDelete(id: number) {
        this.loading = true;
        this.kontaktSVC.deleteKontakt(this.clan.py_user, id).subscribe(
            () => { this.kontaktLST = this.kontaktLST.filter(item => item.id !== id); },
            error => { this.alertSVC.error(error); }
        )
        this.loading = false;
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }
        this.submitted = true;
        this.loading = true;

        let kontakt = new KontaktCl(
            this.form.get(['contactType', 'contactType']).value,
            this.f.contactContent.value
        );

        this.kontaktSVC.addKontakt(this.clan.py_user, kontakt).subscribe(
            data => {
                this.kontaktLST.push(new KontaktCl(data.vrsta, data.sadrzaj, data.id, data.vrsta_value, data.links));
                this.form.reset();
                this.form.get(['contactType', 'contactType']).setValue('');
                this.submitted = false;
            },
            error => { this.alertSVC.error(error); }
        );
        this.loading = false;
    }
}
