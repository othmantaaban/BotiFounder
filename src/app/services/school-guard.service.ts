import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SchoolService } from './school.service';
​
@Injectable({
  providedIn: 'root'
})
export class SchoolGuardService implements CanActivate {
​
  constructor(
    private router: Router,
    private schoolService: SchoolService
  ) { }
​
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.schoolService.getschool();
    console.log(this.schoolService.currentSchool);
    if (!this.schoolService.currentSchool) {
      this.router.navigate([
        '/'
      ]);
      return false;
    }
    // this.fcm.clearAllNotifications();
    return true;
  }
}