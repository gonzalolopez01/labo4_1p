import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const guardTipoGuard: CanActivateFn = (route, state) => {

  const usuarioService =inject(LoginService);
  if(usuarioService.usuarioLogeado.tipo === 'admin' && usuarioService.usuarioLogeado.esHabilitado){
    return true;
  }else{
    console.log('no tiene permisos');
    return false;
  }



};
