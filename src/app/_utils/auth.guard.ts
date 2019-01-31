import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

/**
 * Klasa za sigurnosni nadzor nad Angularovim rutama.
 */
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    /**
     * Ako korisnik ima ovlasti za pregled tražene stranice (definirane rutom),
     * onda metoda vraća true, inače preusmjerava korisnika na stranicu za prijavu.
     * Pri tome se u querystringu čuva povratni URL stranice na koji je korisnik pokušao doći
     * pa ako je prijava uspjela, automatski će biti i preusmjeren tamo.
     * @param route Ruta za koju se ispituju korisnikove ovlasti.
     * @param state Stanje rutera.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true; // Korisnik je prijavljen, ruta može biti aktivirana.
        }
        this.router.navigate(['/prijava'], { queryParams: { returnUrl: state.url }}); // Korisnika se preusmjerava na login uz postavljanje post-prijavnog URL-a.
    }
}