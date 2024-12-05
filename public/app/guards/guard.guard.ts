import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {

  const auth = inject(Auth);
  const router = inject(Router);

  if(auth.currentUser != null){
    console.log("puede pasar");
    return true;
  }
  console.log("no puede pasar");
  router.navigate(["login"]);
  return false;
  return true;
};
