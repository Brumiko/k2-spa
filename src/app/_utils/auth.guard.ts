import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true; // Korisnik je prijavljen, ruta može biti aktivirana.
        }
        this.router.navigate(['/prijava'], { queryParams: { returnUrl: state.url }}); // Korisnika se preusmjerava na login uz postavljanje post-prijavnog URL-a.
    }
}