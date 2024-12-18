import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const guardGuard: CanActivateFn = (route, state) => {

  const auth = inject(Auth);
  const router = inject(Router);
  const usuarioService =inject(LoginService);

  if(auth.currentUser != null && usuarioService.usuarioLogeado.esHabilitado){
    //console.log("puede pasar");
    return true;
  }
  console.log("no puede pasar");
  router.navigate(["login"]);
  return false;  
};
