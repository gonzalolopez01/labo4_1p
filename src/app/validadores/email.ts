import { Auth } from "@angular/fire/auth";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";

export function usuarioExisteAsyncValidator(auth: Auth): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    const mailControl = control.value; // El valor del control actual
    const mailAuth = auth.currentUser?.email; // Email del usuario logueado

    return new Promise((resolve) => {
      // Simular validación asincrónica
      if (mailControl !== mailAuth) {
        resolve({ noCoincide: true }); // Error si los emails no coinciden
      } else {
        resolve(null); // No hay error si coinciden
      }
    });
  };
}