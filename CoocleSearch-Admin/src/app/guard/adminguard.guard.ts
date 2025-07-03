import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const adminguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
    const userData = sessionStorage.getItem("admin_infos");
   
    if (!userData) {
      router.navigate(['auth']);
      return false;
    }
  return true;
};
