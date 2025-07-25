import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = sessionStorage.getItem("admin_infos");
  const parsedData = JSON.parse(userData || '{}');
  if ( userData) {
    router.navigate(['/admin']);
    return false;
  }
  return true;
};
