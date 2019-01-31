import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Funkcija za provjeru da li su obje lozinke pri registraciji jednake.
 * Vraća true ako nisu (tj. "passwords don't match"), inače null (živio JavaScript).
 * @param control Forma na kojoj su upisane lozinke koje treba ispitati.
 */
export const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const pwd1 = control.get('password1');
    const pwd2 = control.get('password2');
    if (pwd1.value !== pwd2.value) {
        return { passwordsDontMatch: true }
    } else {
        return null; // Živio džabaskript.
    }
}