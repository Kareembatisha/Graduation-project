import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  let _userSerivce = inject(UserService);
  let router = inject(Router);
  const token = localStorage.getItem('Token');
  if (token) {
    let decodeToken = jwtDecode(token);
    console.log(decodeToken);

    if (
      decodeToken &&
      typeof decodeToken === 'object' &&
      'role' in decodeToken &&
      decodeToken.role === 'Admin'
    ) {
      return true;
    } else {
      alert('its only for Admin');
      router.navigate(['/signin']);
      return false;
    }
  } else {
    alert('please Login First');
    router.navigate(['/signin']);
    return false;
  }
};
