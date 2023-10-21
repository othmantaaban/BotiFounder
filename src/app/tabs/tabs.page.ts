import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
// import { FinanceJourDashPage } from '../pages/finance-jour-dash/finance-jour-dash.page';
import { SchoolService } from '../services/school.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private router: Router,
    private navController: NavController,
    private schoolService: SchoolService
  ) {
    if(!this.schoolService.currentSchool){
      this.schoolService.getschool();
    }
  }

  gotoAccueil(){
    return this.router.navigate(['tabs/accueil']);
  }

  gotoInscriptions(){
    return this.navController.navigateRoot(['/tabs/suivi-inscription']);
  }

  tabWillChange(ev) {
    console.log(ev);
    // return this.navController.navigateRoot([`tabs/${ev.tab}`])
  }

}
