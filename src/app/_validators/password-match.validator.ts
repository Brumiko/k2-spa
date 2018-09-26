import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const pwd1 = control.get('password1');
    const pwd2 = control.get('password2');
    if (pwd1.value !== pwd2.value) {
        return { passwordsDontMatch: true }
    } else {
        return null; // Živio džabaskript.
    }
}