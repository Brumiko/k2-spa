import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../_services/auth/authentication.service';
import { AlertService } from '../../_services/local/alert.service';

/**
 * Komponenta za prikaz navigacijske trake, uključivo i statusa prijave i odjave.
 */
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
    currentUser;
    loading: boolean = false;
    navbarCollapsed: boolean = true;

    private userChanged(username: string): void {
        this.currentUser = username;
    }

    constructor(private authSVC: AuthenticationService, private alertSVC: AlertService, private router: Router) {
        // Prema:
        // https://stackoverflow.com/questions/42987293/refresh-header-after-login-in-angular2
        // Pretplata na emitiranje događaja prijave i odjave Autentikacijskoga servisa.
        authSVC.newLogin.subscribe(username => this.userChanged(username)); 
    }

    ngOnInit() {
        this.currentUser = localStorage.getItem('currentUser'); // Dohvat autentikacijskoga tokena iz lokalnog spremišta.
    }

    logout() {
        this.loading = true;
        //this.alertSVC.clear();
        this.authSVC.logout();
        this.router.navigate(['/naslovnica']);
        /*
        this.authSVC.logout().subscribe(
            data => {
                this.userChanged(null);
                this.router.navigate(['/home']);
            },
            error => {
                this.alertSVC.error(error);
                this.loading = false;
            }
        );
        */
    }
}
