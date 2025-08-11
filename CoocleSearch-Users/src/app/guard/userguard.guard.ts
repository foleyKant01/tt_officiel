import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const userguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // const userData = sessionStorage.getItem("user_infos");

  // if (!userData) {
  //   router.navigate(['/auth/login']);
  //   return false;
  // }
return true
};
