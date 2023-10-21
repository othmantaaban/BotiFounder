import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService,public router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuth = await this.auth.isLoggedIn();
    console.log('auth' , isAuth);
    if (!isAuth) {
      this.router.navigate(['/']);
      return false;
    }
    // this.fcm.clearAllNotifications();
    return true;
  }
}
