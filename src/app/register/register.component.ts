import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services/local/alert.service';
import { Registration } from '../_models/auth/registration.model';
import { RegistrationService } from '../_services/auth/registration.service';
import { passwordMatchValidator } from '../_validators/password-match.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
    regFRM: FormGroup;
    loading = false;
    submitted = false;

    get f() { return this.regFRM.controls; }    // Utility za olakšani dohvat kontrola s forme.

    constructor(
        private formBuilder: FormBuilder,
        private registrationSVC: RegistrationService,
        private router: Router,
        private alertSVC: AlertService
    ) { }

    ngOnInit() {
        this.regFRM = this.formBuilder.group({  // 'required' i 'maxLength' validatori su u HTML predlošku!
            username: '',                       // TODO: pattern!
            password1: '',                      // TODO: Složenost lozinke.
            password2: '',                      // Usporedba polja se obavlja na razini forme!
            name: '',
            surname: '',
            email: ['', Validators.email],
            id: '',                             // TODO: Znamenke i državni prefiks.
            membershipType: this.formBuilder.group({
                membershipType: ''
            })
        });
        this.regFRM.setValidators([passwordMatchValidator]);
    }

    onSubmit() {
        this.submitted = true;
        if (this.regFRM.invalid) {
            return;
        }
        let user = new Registration(
            this.f.username.value,
            this.f.email.value,
            this.f.password1.value,
            this.f.password2.value,
            this.f.name.value,
            this.f.surname.value,
            this.f.id.value,
            this.regFRM.get(['membershipType', 'membershipType']).value
        );
        this.loading = true;
        this.registrationSVC.register(user).subscribe(
            data => {
                this.alertSVC.success('Prijava za članstvo je uspješno podnesena.', true);
                this.router.navigate(['/prijava']);
            },
            error => {
                this.alertSVC.error(error);
                this.loading = false;
            }
        );
    }
}