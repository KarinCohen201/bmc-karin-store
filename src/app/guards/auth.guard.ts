import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined') {
      const loggedInUser = localStorage.getItem('loggedInUser');

      if (loggedInUser) {
        console.log('User is authenticated:', loggedInUser);
        return true;
      }
    }

    this.router.navigate(['/']);
    return false;
  }
}
