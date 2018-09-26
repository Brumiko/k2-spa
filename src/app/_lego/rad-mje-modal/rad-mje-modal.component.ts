import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbTypeaheadConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RadnoMjesto } from '../../_models/hvk/radno-mjesto.model';
import { RadnoMjestoService } from '../../_services/hvk/radno-mjesto.service';
import { Clan } from '../../_models/hvk/clan.model';
import { AlertService } from '../../_services/local/alert.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Katalog } from '../../_models/hvk/katalog.model';
import { PO } from '../../_models/hvk/po.model';

@Component({
    selector: 'app-rad-mje-modal',
    templateUrl: './rad-mje-modal.component.html',
})
export class RadMjeModalComponent implements OnInit {
    @Input() clan: Clan;            // UVIJEK.
    @Input() radMje: RadnoMjesto;   // Za ažuriranje.
    @Output() emitRadMjeChange = new EventEmitter<RadnoMjesto>();
    naslov: string = '';

    loading = false;
    submitted = false;

    form: FormGroup;
    get f() { return this.form.controls; }

    constructor(
        public activeModal: NgbActiveModal,
        private alertSVC: AlertService,
        private formBuilder: FormBuilder,
        private radMjeSVC: RadnoMjestoService,
        private typeaheadConf: NgbTypeaheadConfig,
    ) {
        typeaheadConf.editable = false;
        typeaheadConf.showHint = true;
    }

    ngOnInit() {
        let startDateArr: string[] = [];
        let endDateArr: string[] = []
        if (this.radMje) {
            this.naslov = 'Ažuriranje radnog mjesta';
            startDateArr = this.radMje.dat_od.toString().split("-");
            if (this.radMje.dat_do) {
                endDateArr = this.radMje.dat_do.toString().split("-");
            }
        } else {
            this.naslov = 'Upis radnog mjesta';
        }

        this.form = this.formBuilder.group({
            nkzAutocomplete: this.formBuilder.group({
                nkzAutocomplete: [this.radMje ? new Katalog(this.radMje.nkz, this.radMje.nkz_value) : null]
            }),
            poAutocomplete: this.formBuilder.group({
                poAutocomplete: [
                    this.radMje ? new PO(
                        this.radMje.po,
                        this.radMje.po_detail['po_naziv'],
                        this.radMje.po_detail['po_oib'],
                        this.radMje.po_detail['po_vrsta'],
                        this.radMje.po_detail['po_vrsta_value'],
                        this.radMje.po_detail['po_ziro'],
                    ) : null]
            }),
            startDate: [this.radMje ? new NgbDate(Number(startDateArr[0]), Number(startDateArr[1]), Number(startDateArr[2])) : null],
            endDate: [this.radMje && this.radMje.dat_do ? new NgbDate(Number(endDateArr[0]), Number(endDateArr[1]), Number(endDateArr[2])) : null],
        });
    }

    onCancel(result) {
        this.activeModal.close(result);
    }

    onSave() {
        if (this.form.invalid) {
            return;
        }
        this.submitted = true;
        this.loading = true;

        let startDate: string = `${this.f.startDate.value.year.toString().padStart(4, '0')}-${this.f.startDate.value.month.toString().padStart(2, '0')}-${this.f.startDate.value.day.toString().padStart(2, '0')}`;

        let endDate: string = null;
        if (this.f.endDate.value) {
            endDate = `${this.f.endDate.value.year.toString().padStart(4, '0')}-${this.f.endDate.value.month.toString().padStart(2, '0')}-${this.f.endDate.value.day.toString().padStart(2, '0')}`;
        }

        if (this.radMje) { // Ažuriranje: PUT.
            this.radMje.nkz = this.form.get(['nkzAutocomplete', 'nkzAutocomplete']).value.ozn;
            this.radMje.po = this.form.get(['poAutocomplete', 'poAutocomplete']).value.id;
            this.radMje.dat_od = startDate;
            this.radMje.dat_do = endDate;

            this.radMjeSVC.updateRadnoMjesto(this.clan.py_user, this.radMje).subscribe(
                data => {
                    this.emitRadMjeChange.next(
                        new RadnoMjesto(
                            data.nkz,
                            data.po,
                            data.dat_od,
                            data.id,
                            data.nkz_value,
                            data.po_detail,
                            data.dat_do,
                            data.links
                        )
                    );
                    this.form.reset();
                    this.submitted = false;
                    this.onCancel('AŽURIRANO');
                },
                error => { this.alertSVC.error(error); }
            );
        } else { // Upis: POST.
            this.radMje = new RadnoMjesto(
                this.form.get(['nkzAutocomplete', 'nkzAutocomplete']).value.ozn,
                this.form.get(['poAutocomplete', 'poAutocomplete']).value.id,
                startDate,
                null,
                null,
                null,
                endDate,
                null
            );
            this.radMjeSVC.addRadnoMjesto(this.clan.py_user, this.radMje).subscribe(
                data => {
                    this.emitRadMjeChange.next(
                        new RadnoMjesto(
                            data.nkz,
                            data.po,
                            data.dat_od,
                            data.id,
                            data.nkz_value,
                            data.po_detail,
                            data.dat_do,
                            data.links
                        )
                    );
                    this.form.reset();
                    this.submitted = false;
                    this.onCancel('UPISANO');
                },
                error => { this.alertSVC.error(error); }
            )
        }
        this.loading = false;
    }

}
