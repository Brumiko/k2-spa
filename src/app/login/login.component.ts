import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { AlertService } from '../_services/local/alert.service';
import { AuthenticationService } from '../_services/auth/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    loginFRM: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    get f() { return this.loginFRM.controls; }    // Utility za olakšani dohvat kontrola s forme.

    constructor(
        private formBuilder: FormBuilder,
        private alertSVC: AlertService,
        private authSVC: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.loginFRM = this.formBuilder.group({
            username: '',
            password: ''
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
    }

    onSubmit() {
        this.submitted = true;
        if  (this.loginFRM.invalid) {
            return;
        }
        this.loading = true;
        this.authSVC.login(this.f.username.value, this.f.password.value).subscribe(
            data => {
                //this.alertSVC.success("Uspješno ste se prijavili.", true);
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertSVC.error(error);
                this.loading = false;
            }
        );
    }
}
