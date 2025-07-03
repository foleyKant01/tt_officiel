import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const guardauthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userData = sessionStorage.getItem("teller_infos");
  const parsedData = JSON.parse(userData || '{}');
  if ( userData) {
    router.navigate(['/teller']);
    return false;
  }
  return true;
};


