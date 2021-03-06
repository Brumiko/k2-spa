import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Alert } from '../../_models/local/alert.model';
import { AlertTypeEnum } from '../../_models/local/alert-type.enum';
import { AlertService } from '../../_services/local/alert.service';
import { HttpAlert } from '../../_models/local/http-alert.model';
import { ServerError } from '../../_models/local/server-error.model';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    alertLST: Alert[] = [];
    serverErrorLST: ServerError[] = [];

    get alertTypeEnum() { return AlertTypeEnum; }

    constructor(private alertSVC: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertSVC.getAlert().subscribe(alert => {
            if (!alert) {
                this.alertLST = [];
                return;
            }
            if (alert.type === 'error') {                               // Greška.
                if (alert.result instanceof (ErrorEvent)) {            // Klijentska greška.
                    this.alertLST.push(new Alert(AlertTypeEnum.WARNING, alert.result))
                } else {                                                // Serverska greška.
                    this.serverErrorLST = [];
                    let array = Object.entries(alert.result.error);
                    for (var i = 0; i < array.length; i++) {
                        let errDesc: string = '';
                        if (array[i].length > 0) {
                            for (var j = 1; j < array[i].length; j++) {
                                errDesc = errDesc + array[i][j] + ' ';
                            }
                        }
                        this.serverErrorLST.push(new ServerError(array[i][0].toString(), errDesc));
                        //console.log(this.serverErrorLST[i]);
                    }

                    this.alertLST.push(
                        new HttpAlert(
                            AlertTypeEnum.WARNING,
                            alert.result.message,
                            alert.result.status,
                            alert.result.statusText,
                            alert.result.url,
                            this.serverErrorLST
                        )
                    );
                }
            } else {
                this.alertLST.push(new Alert(AlertTypeEnum.PRIMARY, alert.result));
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    closeAlert(alert: Alert) {
        const index: number = this.alertLST.indexOf(alert);
        this.alertLST.splice(index, 1);
    }
}
