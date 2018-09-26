import { Component, OnInit, Input } from '@angular/core';
import { Clan } from '../../_models/hvk/clan.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RadnoMjesto } from '../../_models/hvk/radno-mjesto.model';
import { RadnoMjestoService } from '../../_services/hvk/radno-mjesto.service';
import { AlertService } from '../../_services/local/alert.service';
import { RadMjeModalComponent } from '../rad-mje-modal/rad-mje-modal.component';

@Component({
    selector: 'app-profil-rad-mje',
    templateUrl: './profil-rad-mje.component.html',
})
export class ProfilRadMjeComponent implements OnInit {
    @Input() clan: Clan;
    @Input() loadData = false;

    loading = false;

    closeResult: string;
    radMjeLST: RadnoMjesto[];

    constructor(
        private alertSVC: AlertService,
        private modalSVC: NgbModal,
        private radMjeSVC: RadnoMjestoService
    ) { }

    ngOnInit() {
        if (this.loadData) {
            this.radMjeSVC.getRadnaMjesta(this.clan.py_user).subscribe(
                item => { this.radMjeLST = item; },
                error => { this.alertSVC.error(error); }
            );
        }
    }

    onAdd() {
        const modalRef = this.modalSVC.open(RadMjeModalComponent, { centered: true, size: 'lg' });
        modalRef.componentInstance.clan = this.clan;
        modalRef.componentInstance.emitRadMjeChange.subscribe(
            (broadcast) => {
                this.radMjeLST.push(
                    new RadnoMjesto(
                        broadcast.nkz, 
                        broadcast.po, 
                        broadcast.dat_od, 
                        broadcast.id, 
                        broadcast.nkz_value, 
                        broadcast.po_detail, 
                        broadcast.dat_do, 
                        broadcast.links
                    )
                );
                this.radMjeLST.sort((a, b) => (new Date(b.dat_od.toString()).getTime() - new Date(a.dat_od.toString()).getTime()));
            }
        );
        modalRef.result.then(
            (result) => {
                this.closeResult = `Rezultat: ${result}`;
            },
            (reason) => {
                this.closeResult = `razlog ${this.getDismissReason(reason)}`;
            }
        );
    }

    onEdit(radMje) {
        const modalRef = this.modalSVC.open(RadMjeModalComponent, { centered: true, size: 'lg' });
        modalRef.componentInstance.clan = this.clan;
        modalRef.componentInstance.radMje = radMje;
        modalRef.componentInstance.emitRadMjeChange.subscribe(
            (broadcast) => {
                // Ažuriraj postojeći popis radMjeLST
                let updateIX = this.radMjeLST.findIndex(item => item.id === broadcast.id);
                //this.radMjeLST[updatedRadMjeIX].id = broadcast.id;
                this.radMjeLST[updateIX].nkz = broadcast.nkz;
                this.radMjeLST[updateIX].nkz_value = broadcast.nkz_value;
                this.radMjeLST[updateIX].po = broadcast.po;
                this.radMjeLST[updateIX].po_detail = broadcast.po_detail;
                this.radMjeLST[updateIX].dat_od = broadcast.dat_od;
                this.radMjeLST[updateIX].dat_do = broadcast.dat_do;
                this.radMjeLST[updateIX].links = broadcast.links;
                this.radMjeLST.sort((a, b) => (new Date(b.dat_od.toString()).getTime() - new Date(a.dat_od.toString()).getTime()));
            }
        );
        modalRef.result.then(
            (result) => {
                this.closeResult = `Rezultat: ${result}`;
            },
            (reason) => {
                this.closeResult = `razlog ${this.getDismissReason(reason)}`;
            }
        );
    }

    onDelete(id: number) {
        this.loading = true;
        this.radMjeSVC.deleteRadnoMjesto(this.clan.py_user, id).subscribe(
            () => { this.radMjeLST = this.radMjeLST.filter(item => item.id !== id); },
            error => { this.alertSVC.error(error); }
        )
        this.loading = false;
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'Escape';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'klik na pozadinu';
        } else {
            return `uz: ${reason}`;
        }
    }
}