import { CanDeactivateFn } from '@angular/router';
import { FormTerminosycondicionesComponent } from '../components/form-terminosycondiciones/form-terminosycondiciones.component';

export const registroGuard: CanDeactivateFn<FormTerminosycondicionesComponent> = (component, currentRoute, currentState, nextState) => {  
  return component.salir();
};
