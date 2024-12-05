import { CanDeactivateFn } from '@angular/router';
import { FormTerminosycondicionesComponent } from '../components/form-terminosycondiciones/form-terminosycondiciones.component';

export const registroGuard: CanDeactivateFn<FormTerminosycondicionesComponent> = (component, currentRoute, currentState, nextState) => {  
  let ret =  component.salir();
  return ret;
};
